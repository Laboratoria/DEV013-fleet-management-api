from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import config
from sqlalchemy import text
from dotenv import load_dotenv
import os


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASSWORD')}@{os.getenv('PGSQL_HOST')}/{os.getenv('PGSQL_DATABASE')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route('/test_db_connection')
def test_db_connection():
    try:
        # Utiliza text() para declarar la consulta como un objeto SQL explícito
        result = db.session.execute(text('SELECT 1'))
        # Obtiene el resultado de la consulta y lo convierte a JSON
        result_json = {
            'message': 'Conexión exitosa a la base de datos.', 'result': result.scalar()}
        return jsonify(result_json), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run(debug=True)
