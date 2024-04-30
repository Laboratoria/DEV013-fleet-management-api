import pytest
import requests

# Define la URL base de tu API REST
BASE_URL = "http://localhost:5000"

def test_list_taxis_endpoint():
    """Prueba para verificar si el endpoint /taxis devuelve una lista no vacía de taxis"""

    # Realiza una solicitud GET al endpoint /taxis
    response = requests.get(f"{BASE_URL}/taxis", timeout=5)

    # Verifica que la respuesta tenga el código de estado HTTP 200 (OK)
    assert response.status_code == 200

    # Convierte la respuesta JSON en un diccionario
    taxis = response.json()

    # Verifica que la lista de taxis no esté vacía
    assert len(taxis) > 0

    # Verifica que cada taxi tenga las claves 'id' y 'plate'
    for taxi in taxis:
        assert 'id' in taxi
        assert 'plate' in taxi

if __name__ == "__main__":
    pytest.main([__file__])
