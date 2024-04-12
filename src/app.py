from flask import Flask
from config import config
from database.db import connect_to_db
from routes.Taxi import SWAGGER_URL, main_bp, taxi_bp, swaggerui_blueprint, location_bp


app = Flask(__name__)
connect_to_db(app)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
app.register_blueprint(main_bp)
app.register_blueprint(taxi_bp)
app.register_blueprint(location_bp)

if __name__ == '__main__':
    app.config.from_object(config['development'])

    app.run()
