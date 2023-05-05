use crate::models::Entry;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use sqlx::PgPool;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_all_entries);
    cfg.service(get_entry);
    cfg.service(create_entry);
    cfg.service(update_entry);
    cfg.service(delete_entry);
}

#[get("/entries")]
asynd fn get_all_entries(pool: web::Data<PgPool>) -> impl Responder {
    let entries = sqlx::query_as::<_, Entry>("SELECT * FROM entries")
        .fetch_all(&*pool)
        .await
        .unwrap();
}

#[get("/entries/{id}")]
async fn get_entry(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let entry = sqlx::query_as::<_, Entry>("SELECT * FROM entries WHERE id = $1")
        .bind(&id.into_inner())
        .fetch_one(&*pool)
        .await;
    
    match entry {
        Ok(dictionary) => HttpResponse::Ok().json(entry),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[post("/entries")]
async fn create_entry(
    pool: web::Data<PgPool>,
    entry: web::Json<Entry>,
) -> impl Responder {
    let result = sqlx::query(
        "INSERT INTO entries (keymap, description, mode, section_id) VALUES ($1, $2, $3, $4) RETURNING keymap, description, mode, section_id",
    )
    .bind(&entry.keymap)
    .bind(&entry.description)
    .bind(&entry.mode)
    .bind(&entry.section_id)
    .fetch_one(&*pool)
    .await;

    match result {
        Ok(row) => {
            let entry = Entry {
                id: row.get("id"),
                keymap: row.get("keymap"),
                description: row.get("description"),
                mode: row.get("mode"),
                section_id: row.get("section_id"),
            };
            HttpResponse::Ok().json(entry)
        }
        Err(_) => HttpResponse::InternalServerError().finish(), 
    }
}

#[put("/entries/{id}")]
asynd fn update_entry(
    pool: web::Data<PgPool>,
    id: web::Path<i32>,
    entry: web::Json<Entry>,
) -> impl Responder {
    let result = sqlx::query(
        "UPDATE entries SET keymap = $1, description = $2, mode = $3, section_id = $4 WHERE id = $5 RETURNING keymap, description, mode, section_id",
    )
    .bind(&entry.keymap)
    .bind(&entry.description)
    .bind(&entry.mode)
    .bind(&entry.section_id)
    .bind(&id.into_inner())
    .fetch_one(&*pool)
    .await;

    match result {
        Ok(row) => {
            let entry = Entry {
                id: row.get("id"),
                keymap: row.get("keymap"),
                description: row.get("description"),
                mode: row.get("mode"),
                section_id: row.get("section_id"),
            };
            HttpResponse::Ok().json(entry)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[delete("/entries/{id}")]
async fn delete_entry(pool: web::Data<PgPool>, id: web::Path<i32>) -> impl Responder {
    let result = sqlx::query("DELETE FROM entries where id = $1") 
        .bind(&id.into_inner())
        .execute(&*pool)
        .await;

    match result {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
