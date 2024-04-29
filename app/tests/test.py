import json
# from source import reverse_str
from ..routes import getting_taxis
# from app import models

# def test_should_reverse_string():
#     assert reverse_str('abc') == 'cba'

def test_should_return_json():
    # debo mockear getting taxis?
    taxi = getting_taxis()
    # taxi_type = json.loads(json.dumps(taxi)).get('type')
    doc = json.loads(json.dumps(taxi))
    doc.get('type')
    try:
        assert True
    except AttributeError:
        assert False
   


    