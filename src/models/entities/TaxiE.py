from sqlalchemy import Column, Integer, String
from database.db import db


class Taxi(db.Model):
    __tablename__ = 'taxies'

    id = db.Column(Integer, primary_key=True)
    plate = db.Column(String(20), nullable=False)

    def __repr__(self):
        return f"<Taxi(id={self.id}, plate='{self.plate}')>"

    def to_JSON(self):
        return {
            'id': self.id,
            'plate': self.plate
        }
