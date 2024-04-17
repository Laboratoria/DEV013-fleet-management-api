import os
from flask import Flask
from flasgger import Swagger
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    postgres_url = os.environ.get('POSTGRES_URL')
    print("POSTGRES_URL:", postgres_url)
    if not postgres_url:
        raise ValueError("POSTGRES_URL not found in environment variables.")

    app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    
    db.init_app(app)
    swagger = Swagger(app)
    return app
