from flask import Flask, jsonify, send_from_directory
from config import config, Config
from flask_sqlalchemy import SQLAlchemy
from database.db import connect_to_db
from routes.Taxi import main_bp, taxi_bp
from flask_swagger_ui import get_swaggerui_blueprint


SWAGGER_URL = '/swagger'
API_URL = 'http://localhost:5000/apidocs/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Fleet Management API"
    }
)


app = Flask(__name__)
connect_to_db(app)


@app.route('/apidocs/swagger.json')
def swagger_json():
    return send_from_directory('static', 'swagger.json')


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
app.register_blueprint(main_bp)
app.register_blueprint(taxi_bp)
if __name__ == '__main__':
    app.config.from_object(config['development'])

    app.run()
