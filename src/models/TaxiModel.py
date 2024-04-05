from database.db import connect_to_db
from .entities.TaxiE import Taxi


class TaxiModel():

    @classmethod
    def get_taxi(cls):
        connection = connect_to_db()
        try:
            query = connection.query(Taxi).all()
            return query
        except Exception as ex:
            raise Exception(ex)
        finally:
            connection.close()

    @classmethod
    def get_taxi_as_json(cls):
        try:
            taxies = cls.get_taxi()
            taxies_json = [taxi.to_JSON() for taxi in taxies]
            return taxies_json
        except Exception as ex:
            raise Exception(ex)
