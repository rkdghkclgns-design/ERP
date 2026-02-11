import os

class Settings:
    PROJECT_NAME: str = "Enterprise AI ERP"
    PROJECT_VERSION: str = "1.0.0"
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
settings = Settings()
