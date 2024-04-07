from flask import Blueprint, jsonify, request
from models.TaxiModel import TaxiModel
from models.entities.TaxiE import Taxi
from flask_restplus import Api, Resource


main_bp = Blueprint("main_bp", __name__)


@main_bp.route('/')
def index():
    return jsonify({'mensaje': 'Pagina principal'})


taxi_bp = Blueprint("taxi_bp", __name__)


@taxi_bp.route('/taxi', )
def get_taxies_list():
    try:
        page = int(request.args.get('page', 1))
        per_page = 5
        taxies_paginated = Taxi.query.paginate(page=page, per_page=per_page)
        taxies_list = [taxi.to_JSON() for taxi in taxies_paginated.items]
        return jsonify({
            'taxies': taxies_list,
            'total_pages': taxies_paginated.pages,
            'current_page': taxies_paginated.page
        }), 200
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
