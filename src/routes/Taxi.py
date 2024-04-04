from flask import Blueprint, jsonify

main = Blueprint("taxi_blueprint", __name__)


@main.route('/')
def get_taxies():
    return jsonify({'mensaje': 'Prueba'})
