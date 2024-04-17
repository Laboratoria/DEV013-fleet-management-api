from flask import jsonify
from .taxi_models import Taxi
from . import create_app

app = create_app()

@app.route('/taxis', methods=['GET'])
def get_taxis():

    taxis = Taxi.query.all()
    taxis_list = []
    print(taxis)
    # taxis_list = [{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis]
    for taxi in taxis:
        taxis_list.append(taxi.toDict())
    return jsonify(taxis_list)

if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)
    