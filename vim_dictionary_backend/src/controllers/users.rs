use crate::models::{Dictionary, Section, Entry, User};
use actix_identity::Identity;
use actix_web::{get, post, delete, web, HttpResponse, HttpRequest, Responder};
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{encode, decode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;
use std::env;
use log::info;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_user_data);
    cfg.service(register);
    cfg.service(login);
    cfg.service(logout);
    cfg.service(get_all_users);
    cfg.service(get_user);
    cfg.service(delete_user);
    cfg.service(validate_token);
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserData {
    pub dictionaries: Vec<Dictionary>,
    pub sections: Vec<Section>,
    pub entries: Vec<Entry>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterData {
    pub username: String,
    pub password: String,
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct LoginData {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[get("/user_data/{user_id}")]
async fn get_user_data(pool: web::Data<PgPool>, user_id: web::Path<i32>) -> impl Responder {
    let user_id = user_id.into_inner();

    let dictionaries = sqlx::query_as::<_, Dictionary>("SELECT * FROM dictionaries WHERE user_id = $1")
        .bind(&user_id)
        .fetch_all(&**pool)
        .await
        .unwrap();

    let dictionary_ids: Vec<i32> = dictionaries.iter().map(|dictionary| dictionary.id).collect();
    let sections = sqlx::query_as::<_, Section>("SELECT * FROM sections WHERE dictionary_id = ANY($1)")
        .bind(&dictionary_ids)
        .fetch_all(&**pool)
        .await
        .unwrap();

    let section_ids: Vec<i32> = sections.iter().map(|section| section.id).collect();
    let entries = sqlx::query_as::<_, Entry>("SELECT * FROM entries WHERE section_id = ANY($1)")
        .bind(&section_ids)
        .fetch_all(&**pool)
        .await
        .unwrap();

    let user_data = UserData {
        dictionaries,
        sections,
        entries,
    };

    HttpResponse::Ok().json(user_data)
}

#[post("/register")]
async fn register(pool: web::Data<PgPool>, data: web::Json<RegisterData>) -> impl Responder {
    let password_hash = hash(&data.password, DEFAULT_COST).unwrap();

    let result = sqlx::query!(
        "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id, username",
        &data.username,
        &password_hash,
        &data.email
    )
    .fetch_one(&**pool)
    .await;

    match result {
        Ok(user) => {
            let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
            let key = EncodingKey::from_secret(secret_key.as_ref());
            let expiration = 24 * 3600; // 24 hours
            let now = chrono::Utc::now().timestamp() as usize;
            let claims = Claims {
                sub: user.username,
                exp: now + expiration,
            };
            let token = encode(&Header::default(), &claims, &key).unwrap();

            let response_data = json!({
                "token": token,
                "user_id": user.id
            });

            HttpResponse::Created().json(response_data)
        },
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("/login")]
async fn login(
    pool: web::Data<PgPool>,
    identity: Identity,
    data: web::Json<LoginData>,
) -> impl Responder {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = $1")
        .bind(&data.username)
        .fetch_one(&**pool)
        .await;

    match user {
        Ok(user) => {
            if verify(&data.password, &user.password_hash).unwrap() {
                let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
                let key = EncodingKey::from_secret(secret_key.as_ref());
                let expiration = 24 * 3600; // 24 hours
                let now = chrono::Utc::now().timestamp() as usize;
                let claims = Claims {
                    sub: user.username,
                    exp: now + expiration,
                };
                let token = encode(&Header::default(), &claims, &key).unwrap();

                let response_data = json!({
                    "token": token,
                    "user_id": &user.id
                });

                identity.remember(token.clone());
                HttpResponse::Ok().json(response_data)
            } else {
                HttpResponse::Unauthorized().finish()
            }
        }
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[get("/logout")]
async fn logout(identity: Identity) -> impl Responder {
    identity.forget();
    HttpResponse::Ok().finish()
}

#[post("/validate_token")]
async fn validate_token(req: HttpRequest) -> impl Responder {
    match req.headers().get("Authorization") {
        Some(token_header) => {
            if let Ok(token) = token_header.to_str() {
                if token.starts_with("Bearer ") {
                    let token = &token[7..];
                    let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
                    let decoding_key = DecodingKey::from_secret(secret_key.as_ref());
                    let validation = Validation::default();

                    match decode::<Claims>(&token, &decoding_key, &validation) {
                        Ok(_) => {
                            HttpResponse::Ok().finish()
                        }
                        Err(e) => {
                            info!("Failed to decode token: {:?}", e);
                            HttpResponse::Unauthorized().finish()
                        }
                    }
                } else {
                    info!("Malformed Authorization header");
                    HttpResponse::BadRequest().finish()
                }
            } else {
                info!("Failed to convert Authorization header to string");
                HttpResponse::BadRequest().finish()
            }
        }
        None => {
            info!("No token received");
            HttpResponse::Unauthorized().finish()
        }
    }
}

#[get("/users")]
async fn get_all_users(pool: web::Data<PgPool>) -> impl Responder {
    let users = sqlx::query_as::<_, User>("SELECT * FROM users")
        .fetch_all(&**pool)
        .await
        .unwrap();

    HttpResponse::Ok().json(users)
}

#[get("/users/{id}")]
async fn get_user(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(&id.into_inner())
        .fetch_one(&**pool)
        .await;

    match user {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[delete("/users/{id}")]
async fn delete_user(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let result = sqlx::query("DELETE FROM users WHERE id = $1")
        .bind(&id.into_inner())
        .execute(&**pool)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
