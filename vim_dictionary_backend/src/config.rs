use std::env;

pub struct Config {
    pub db_url: String,
    pub db_pool_min: u32,
    pub db_pool_max: u32,
    pub server_bind: String,
    pub server_port: u16,
    pub db_use_tls: bool,
    pub use_pgbouncer: bool,
}

impl Config {
    pub fn new() -> Self {
        let use_pgbouncer = env::var("USE_PGBOUNCER")
            .unwrap_or_else(|_| "false".to_string())
            .to_lowercase()
            .parse::<bool>()
            .unwrap_or(false);

        let db_url = if use_pgbouncer {
            format!("{}?sslmode=disable", env::var("DATABASE_URL").expect("DATABASE_URL must be set"))
        } else {
            env::var("DATABASE_URL").expect("DATABASE_URL must be set")
        };

        Self {
            db_url,
            db_pool_min: env::var("DB_POOL_MIN")
                .unwrap_or_else(|_| "5".to_string())
                .parse()
                .expect("DB_POOL_MIN must be an integer"),
            db_pool_max: env::var("DB_POOL_MAX")
                .unwrap_or_else(|_| "10".to_string())
                .parse()
                .expect("DB_POOL_MAX must be an integer"),
            server_bind: env::var("SERVER_BIND").unwrap_or_else(|_| "127.0.0.1".to_string()),
            server_port: env::var("PORT")
                .unwrap_or_else(|_| "8080".to_string())
                .parse()
                .expect("SERVER_PORT must be an integer"),
            db_use_tls: env::var("DB_USE_TLS")
                .unwrap_or_else(|_| "true".to_string())
                .parse()
                .expect("DB_USE_TLS must be a boolean"),
            use_pgbouncer,
        }
    }
}

