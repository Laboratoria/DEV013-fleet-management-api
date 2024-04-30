# test_app.py
import pytest

def test_invalid_route(client):
    response = client.get('/invalid_route')
    assert response.status_code == 404

def test_get_taxis(client):
    response = client.get('/taxis')
    assert response.status_code == 200
    assert b'id' in response.data
    assert b'plate' in response.data
    
def test_get_trajectories(client):
    response = client.get('/trajectories')
    assert response.status_code == 200
    assert b'id' in response.data
    assert b'taxi_id' in response.data
    assert b'date' in response.data
    assert b'latitude' in response.data
    assert b'longitude' in response.data

def test_taxis_pagination(client):
    response = client.get('/taxis?page=1&per_page=10')
    assert response.status_code == 200
    assert len(response.json) == 10

def test_trajectories_pagination(client):
    response = client.get('/trajectories?page=1&per_page=10')
    assert response.status_code == 200
    assert len(response.json) == 10
