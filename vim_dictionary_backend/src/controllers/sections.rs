use crate::models::Section;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use sqlx::{PgPool, Row};

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_all_sections);
    cfg.service(get_section);
    cfg.service(create_section);
    cfg.service(update_section);
    cfg.service(delete_section);
}

#[get("/sections")]
async fn get_all_sections(pool: web::Data<PgPool>) -> impl Responder {
    let sections = sqlx::query_as::<_, Section>("SELECT * FROM sections")
        .fetch_all(&**pool)
        .await
        .unwrap();
    HttpResponse::Ok().json(sections)
}

#[get("/sections/{id}")]
async fn get_section(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let section = sqlx::query_as::<_, Section>("SELECT * FROM sections WHERE id = $1")
        .bind(&id.into_inner())
        .fetch_one(&**pool)
        .await;

    match section {
        Ok(section) => HttpResponse::Ok().json(section),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[post("/sections")]
async fn create_section(
    pool: web::Data<PgPool>,
    section: web::Json<Section>,
) -> impl Responder {
    let result = sqlx::query(
        "INSERT INTO sections (name, dictionary_id) VALUES ($1, $2) RETURNING id, name, dictionary_id",
    )
    .bind(&section.name)
    .bind(&section.dictionary_id)
    .fetch_one(&**pool)
    .await;

    match result {
        Ok(row) => {
            let section = Section {
                id: row.get("id"),
                name: row.get("name"),
                dictionary_id: row.get("dictionary_id")
            };
            HttpResponse::Ok().json(section)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[put("/sections/{id}")]
async fn update_section(
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    section: web::Json<Section>,
) -> impl Responder {
    let result = sqlx::query(
        "UPDATE sections SET name = $1, dictionary_id = $2 WHERE id = $3 RETURNING id, name, dictionary_id",
    )
    .bind(&section.name)
    .bind(&section.dictionary_id)
    .bind(&id.into_inner())
    .fetch_one(&**pool)
    .await;

    match result {
        Ok(row) => {
            let section = Section {
                id: row.get("id"),
                name: row.get("name"),
                dictionary_id: row.get("dictionary_id"),
            };
            HttpResponse::Ok().json(section)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[delete("/sections/{id}")]
async fn delete_section(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let result = sqlx::query("DELETE FROM sections WHERE id = $1")
        .bind(&id.into_inner())
        .execute(&**pool)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
