from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)
    JWTManager(app)

    from app.routes.auth import auth_bp
    from app.routes.products import products_bp
    from app.routes.chat import chat_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(chat_bp)

    return app
