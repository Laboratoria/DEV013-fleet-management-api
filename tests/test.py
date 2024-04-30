import json
from app.routes import getting_taxis, app
from flask import jsonify

def test_getting_taxis():
    with app.test_request_context(
        "/", query_string={"limit": 1, "page": 1}
    ):
        expected_value = [{"id":21,"plate":"NNEL-8793"}]
        response = getting_taxis()
        assert response.json == expected_value

def test_taxi_limit():
    with app.test_request_context(
        "/", query_string={"limit": 10, "page": 3}
    ):
        response = getting_taxis()
        assert len(response.json) == 10

def test_taxi_page():
    with app.test_request_context(
        "/", query_string={"limit": 1, "page": 2}
    ):
        expected_value = [{"id":56,"plate":"JIMF-2287"}]
        response = getting_taxis()
        assert response.json == expected_value

def test_taxis_status():
    with app.test_request_context(
        "/", query_string={"limit": 1, "page": 1}
    ):
        response = getting_taxis()
        assert response.status_code == 200

# def test_taxi_json():
#     taxi = getting_taxis()
#     doc = json.loads(json.dumps(taxi))
#     assert doc.get('type') == json
#     try:
#         assert True
#     except AttributeError:
#         assert False
