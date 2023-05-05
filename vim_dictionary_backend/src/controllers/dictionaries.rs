use crate::models::Dictionary;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use sqlx::PgPool;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_all_dictionaries);
    cfg.service(get_dictionary);
    cfg.service(create_dictionary);
    cfg.service(update_dictionary);
    cfg.service(delete_dictionary);
}

#[get("/dictionaries")]
async fn get_all_dictionaries(pool: web::Data<PgPool>) -> impl Responder {
    let dictionaries = sqlx::query_as::<_, Dictionary>("SELECT * FROM dictionaries")
        .fetch_all(&*pool)
        .await
        .unwrap();

    HttpResponse::Ok().json(dictionaries)
}

#[get("/dictionaries/{id}")]
async fn get_dictionary(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let dictionary = sqlx::query_as::<_, Dictionary>("SELECT * FROM dictionaries WHERE id = $1")
        .bind(&id.into_inner())
        .fetch_one(&*pool)
        .await;

    match dictionary {
        Ok(dictionary) => HttpResponse::Ok().json(dictionary),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[post("/dictionaries")]
async fn create_dictionary(
    pool: web::Data<PgPool>,
    dictionary: web::Json<Dictionary>,
) -> impl Responder {
    let result = sqlx::query(
        "INSERT INTO dictionaries (name, user_id) VALUES ($1, $2) RETURNING id, name, user_id",
    )
    .bind(&dictionary.name)
    .bind(&dictionary.user_id)
    .fetch_one(&*pool)
    .await;

    match result {
        Ok(row) => {
            let dictionary = Dictionary {
                id: row.get("id"),
                name: row.get("name"),
                user_id: row.get("user_id"),
            };
            HttpResponse::Ok().json(dictionary)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[put("/dictionaries/{id}")]
async fn update_dictionary(
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    dictionary: web::Json<Dictionary>,
) -> impl Responder {
    let result = sqlx::query(
        "UPDATE dictionaries SET name = $1, user_id = $2 WHERE id = $3 RETURNING id, name, user_id",
    )
    .bind(&dictionary.name)
    .bind(&dictionary.user_id)
    .bind(&id.into_inner())
    .fetch_one(&*pool)
    .await;

    match result {
        Ok(row) => {
            let dictionary = Dictionary {
                id: row.get("id"),
                name: row.get("name"),
                user_id: row.get("user_id"),
            };
            HttpResponse::Ok().json(dictionary)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[delete("/dictionaries/{id}")]
async fn delete_dictionary(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let result = sqlx::query("DELETE FROM dictionaries WHERE id = $1")
        .bind(&id.into_inner())
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
