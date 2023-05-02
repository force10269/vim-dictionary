use actix_web::{web, HttpResponse, Responder};

pub fn router(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("").route(web::get().to(api_handler)));
}

async fn api_handler() -> impl Responder {
    HttpResponse::Ok().body("API is running")
}

