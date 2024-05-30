import pytest


@pytest.mark.parametrize("expected_status", [200])
def test_show_taxis(client, expected_status):
    """test for function taxis"""
    # Make the GET request to the '/taxis' endpoint
    response = client.get('/taxis')
    assert response.status_code == expected_status


# import pytest
# from src.main import app

# @pytest.fixture
# def client():
#     app.config['TESTING'] = True
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
#     with app.test_client() as client:
#         with app.app_context():
#             yield client

# @pytest.mark.parametrize("mock_data, expected_status, expected_plates", [
#     (
#         [
    # {
    #     "id": 9217,
    #     "plate": "MJDD-8286"
    # },
    # {
    #     "id": 6737,
    #     "plate": "DLEP-5452"
    # }
#         ],
#         200,
#         ['MJDD-8286', 'DLEP-5452']
#     )
# ])
# def test_show_taxis(client, mocker, mock_data, expected_status, expected_plates):
#     # Mock of the query results
#     mocker.patch('src.main.Taxi.query')
#     mock_query = app.db.session.query.return_value

#     mock_query.limit().all.return_value = [type('Taxi', (), data) for data in mock_data]

#     # Make the GET request to the '/taxis' endpoint
#     response = client.get('/taxis/')

#     # Check code of the answer
#     assert response.status_code == expected_status

#     # Check the result of the answer
#     data = response.json()
#     assert 'taxis' in data
#     assert len(data['taxis']) == len(expected_plates)

#     # Check taxis' plates
#     for taxi, expected_plate in zip(data['taxis'], expected_plates):
#         assert taxi['plate'] == expected_plate
