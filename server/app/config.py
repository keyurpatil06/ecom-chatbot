class Config:
    SECRET_KEY = 'supersecretkey'
    JWT_SECRET_KEY = 'jwt-secret-string'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///ecommerce.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
