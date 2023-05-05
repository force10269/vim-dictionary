use sqlx::FromRow;
use actix_web::{HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Dictionary {
    pub id: i32,
    pub name: String,
    pub user_id: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Section {
    pub id: i32,
    pub name: String,
    pub dictionary_id: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Entry {
    pub id: i32,
    pub keymap: String,
    pub description: String,
    pub mode: String,
    pub section_id: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password_hash: String,
    pub email: String,
}

async fn api_handler() -> impl Responder {
    HttpResponse::Ok().body("API is running")
}

