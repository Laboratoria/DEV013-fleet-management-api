from flask import Blueprint, jsonify
from models.TaxiModel import TaxiModel

main_bp = Blueprint("main_bp", __name__)


@main_bp.route('/')
def index():
    return jsonify({'mensaje': 'Pagina principal'})


taxi_bp = Blueprint("taxi_bp", __name__)


@taxi_bp.route('/taxi')
def get_taxies_list():
    try:
        taxies_list = TaxiModel.get_taxi_as_json()
        return jsonify(taxies_list), 200
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
