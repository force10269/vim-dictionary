use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use env_logger;
use std;

use config::Config;

mod config;
mod models;
mod controllers;

use crate::controllers::{dictionaries, entries, sections, users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::new()
        .filter(None, log::LevelFilter::Info)
        .init();
    dotenv().ok();
    let conf = Config::new();

    let db_pool_options = PgPoolOptions::new()
        .min_connections(conf.db_pool_min)
        .max_connections(conf.db_pool_max);

    let db_pool = db_pool_options
        .connect(&conf.db_url)
        .await
        .expect("Failed to create a database connection pool");

    let server_address = format!("{}:{}", conf.server_bind, conf.server_port);
    println!("Listening requests on {}", server_address);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db_pool.clone()))
            .service(
                web::scope("/api")
                    .configure(|cfg| {
                        dictionaries::init_routes(cfg);
                        entries::init_routes(cfg);
                        sections::init_routes(cfg);
                        users::init_routes(cfg);
                    })
                    .wrap(
                        Cors::default()
                            .allow_any_origin()
                            .allow_any_method()
                            .allow_any_header()
                            .max_age(3600),
                    ),
            )
            .route("/health", web::get().to(health_handler))
            .default_service(web::route().to(HttpResponse::NotFound))
    })
    .bind(server_address)?
    .run()
    .await
}

async fn health_handler() -> impl Responder {
    HttpResponse::Ok().body("OK")
}

