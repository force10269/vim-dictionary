use crate::models::User;
use actix_identity::Identity;
use actix_web::{get, post, delete, web, HttpResponse, Responder};
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::env;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(register);
    cfg.service(login);
    cfg.service(logout);
    cfg.service(get_all_users);
    cfg.service(get_user);
    cfg.service(delete_user);
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

#[post("/register")]
async fn register(pool: web::Data<PgPool>, data: web::Json<RegisterData>) -> impl Responder {
    let password_hash = hash(&data.password, DEFAULT_COST).unwrap();

    let result = sqlx::query(
        "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id",
    )
    .bind(&data.username)
    .bind(&password_hash)
    .bind(&data.email)
    .fetch_one(&**pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Created().finish(),
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
                let claims = Claims {
                    sub: user.username,
                    exp: expiration,
                };
                let token = encode(&Header::default(), &claims, &key).unwrap();

                identity.remember(token.clone());
                HttpResponse::Ok().json(token)
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
