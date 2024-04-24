from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Taxi(db.Model):
    __tablename__ = 'taxis' 
    """
    Modelo de datos para representar un taxi.

    Atributos:
        id (int): Identificador único del taxi (clave primaria).
        plate (str): Placa del taxi.
    """
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), unique=True, nullable=False)
