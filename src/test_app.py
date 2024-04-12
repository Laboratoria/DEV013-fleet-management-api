from routes import Taxi
from routes.Taxi import taxi_bp
from flask_testing import TestCase
from database import db
from app import app


class TestTaxiPagination(TestCase):

    def test_get_taxis_paginated(self):
        # Parámetros de la consulta
        page = 2
        per_page = 5

    # Realizar la consulta
        response = self.client.get(
            f'/api/taxis?page={page}&per_page={per_page}'
        )

    # Validar la respuesta
        self.assertEqual(response.status_code, 200)
        data = response.json()

    # Validar la cantidad de taxis
        self.assertEqual(len(data['taxis']), per_page)

    # Validar la página actual
        self.assertEqual(data['page'], page)

    # Validar la información de un taxi
    taxi = data['taxis'][0]
    self.assertEqual(taxi['name'], f"Taxi {page * per_page - 4}")
    self.assertEqual(taxi['plate'], f"ABC{page * per_page - 4}")
