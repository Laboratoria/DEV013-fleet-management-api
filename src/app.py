import os
from flask import Flask, jsonify
from flasgger import Swagger
from models import db,Taxi

app = Flask(__name__)

# Obtener la URI de conexión a PostgreSQL desde las variables de entorno
postgres_url = os.getenv('POSTGRES_URL')

if not postgres_url:
    raise ValueError("POSTGRES_URL not found in environment variables.")

# Configurar la URI de conexión en la aplicación Flask
app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Configuración de Flasgger
Swagger(app)

# Ruta para listar todos los taxis
@app.route('/taxis', methods=['GET'])
def get_taxis():
    
    taxis = Taxi.query.all()
    print(taxis)
    taxis_list = [{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis]
    return jsonify(taxis_list)

if __name__ == "__main__":
    app.run(debug=True)
