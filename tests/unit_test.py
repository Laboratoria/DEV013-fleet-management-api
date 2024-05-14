from app.serializers import taxis_serializer, trajectories_serializer, latest_serializer
import datetime

trajectories_tuple = [(2, 6418, datetime.datetime(2008, 2, 2, 14, 25, 54), 116.3043, 39.9622),
                      (3, 6418, datetime.datetime(2008, 2, 2, 14, 30, 55), 116.32259, 39.96596),
                      (4, 6418, datetime.datetime(2008, 2, 2, 14, 32, 44), 116.34547, 39.96616)]

taxis_tuple = [(21, 'NNEL-8793'),
                (56, 'JIMF-2287'),
                (71, 'CLLD-1805'),
                (108, 'LNGK-1108'),
                (165, 'HKNN-8042')]

latest_tuple = [(6598, 'FHLB-7962', 2601, 6598, datetime.datetime(2008, 2, 8, 17, 37, 43), 116.32706, 39.84801),
                (7088, 'HDBL-4695', 3503, 7088, datetime.datetime(2008, 2, 8, 12, 14, 46), 117.11593, 40.1541),
                (7249, 'CNCJ-2997', 5054, 7249, datetime.datetime(2008, 2, 8, 17, 36, 33), 116.291, 39.88672)]

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

def test_latest_ser():
    expected_value = [{'taxi_id': 6598, 'plate': 'FHLB-7962', 'date': datetime.datetime(2008, 2, 8, 17, 37, 43), 'latitude': 116.32706, 'longitude': 39.84801}, {'taxi_id': 7088, 'plate': 'HDBL-4695', 'date': datetime.datetime(2008, 2, 8, 12, 14, 46), 'latitude': 117.11593, 'longitude': 40.1541}, {'taxi_id': 7249, 'plate': 'CNCJ-2997', 'date': datetime.datetime(2008, 2, 8, 17, 36, 33), 'latitude': 116.291, 'longitude': 39.88672}]
    assert latest_serializer(latest_tuple) == expected_value

    # intentar test con flask test client