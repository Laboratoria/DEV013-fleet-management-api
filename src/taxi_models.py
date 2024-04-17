from . import db
from sqlalchemy import inspect

class Taxi(db.Model):
     
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), unique=True, nullable=False)
    # How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self): 
        return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }
