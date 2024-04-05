from flask import Flask, jsonify
from config import config
from routes import Taxi
from database.db import connect_to_db
from routes.Taxi import main_bp, taxi_bp

app = Flask(__name__)
app.register_blueprint(main_bp)
app.register_blueprint(taxi_bp)
if __name__ == '__main__':
    app.config.from_object(config['development'])

    app.run()
