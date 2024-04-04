from database.db import db, app
from flask import jsonify
from config import config
from sqlalchemy import text
from routes import Taxi

# Probar la conexion


@app.route('/test_db_connection')
def test_db_connection():
    try:
        result = db.session.execute(text('SELECT 1'))
        result_json = {
            'message': 'Conexión exitosa a la base de datos.', 'result': result.scalar()}
        return jsonify(result_json), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.config.from_object(config['development'])

    # Blueprints
    app.register_blueprint(Taxi.main, url_prefix='/api/taxies')
    app.run()
