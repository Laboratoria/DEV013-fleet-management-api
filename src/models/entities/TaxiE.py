from sqlalchemy import Column, Integer, String
from database.db import Base


class Taxi(Base):
    __tablename__ = 'taxies'

    id = Column(Integer, primary_key=True)
    plate = Column(String(20), nullable=False)

    def __repr__(self):
        return f"<Taxi(id={self.id}, plate='{self.plate}')>"

    def to_JSON(self):
        return {
            'id': self.id,
            'plate': self.plate
        }
