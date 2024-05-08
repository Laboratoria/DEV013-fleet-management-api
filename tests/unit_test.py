from app.serializers import taxis_serializer, trajectories_serializer
import datetime

trajectories_tuple = [(2, 6418, datetime.datetime(2008, 2, 2, 14, 25, 54), 116.3043, 39.9622),
                      (3, 6418, datetime.datetime(2008, 2, 2, 14, 30, 55), 116.32259, 39.96596),
                      (4, 6418, datetime.datetime(2008, 2, 2, 14, 32, 44), 116.34547, 39.96616)]

taxis_tuple = [(21, 'NNEL-8793'),
                (56, 'JIMF-2287'),
                (71, 'CLLD-1805'),
                (108, 'LNGK-1108'),
                (165, 'HKNN-8042')]

def test_taxis_ser():
    expected_value = [{'id': 21, 'plate': 'NNEL-8793'},
               {'id': 56, 'plate': 'JIMF-2287'},
               {'id': 71, 'plate': 'CLLD-1805'},
               {'id': 108, 'plate': 'LNGK-1108'},
               {'id': 165, 'plate': 'HKNN-8042'}]
    assert taxis_serializer(taxis_tuple) == expected_value

def test_trajectories_ser():
    expected_value = [{'taxi_id': 6418, 'date': datetime.datetime(2008, 2, 2, 14, 25, 54), 'latitude': 116.3043, 'longitude': 39.9622},
                      {'taxi_id': 6418, 'date': datetime.datetime(2008, 2, 2, 14, 30, 55), 'latitude': 116.32259, 'longitude': 39.96596},
                      {'taxi_id': 6418, 'date': datetime.datetime(2008, 2, 2, 14, 32, 44), 'latitude': 116.34547, 'longitude': 39.96616}]
    assert trajectories_serializer(trajectories_tuple) == expected_value