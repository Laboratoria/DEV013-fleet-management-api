from decouple import config
import os


class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASSWORD')}@{os.getenv('PGSQL_HOST')}/{os.getenv('PGSQL_DATABASE')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER_URL = '/swagger'
    API_URL = 'http://localhost:5000/apidocs/swagger.json'


class DevelopmentConfig(Config):
    DEBUG = True


config = {
    'development': DevelopmentConfig
}
