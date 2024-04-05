from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


def connect_to_db():
    try:
        database_config = Config.SQLALCHEMY_DATABASE_URI

        engine = create_engine(database_config)
        Session = sessionmaker(bind=engine)
        session = Session()
        return session
    except exc.SQLAlchemyError as e:
        print(type(e))
