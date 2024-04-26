import os
from dotenv import load_dotenv
from flask import Flask
from ..models.models import db
from flasgger import Swagger
from ..routes.taxis import taxi_routes

load_dotenv()
app = Flask(__name__)

# Get the PostreSQL connection URI from enviroment variables
postgres_url = os.getenv('POSTGRES_URL')

if not postgres_url:
    raise ValueError("POSTGRES_URL not found in environment variables.")

# Configure the connection URI in Flask application
app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Register taxi routes
app.register_blueprint(taxi_routes)

# Configure Flasgger
swagger = Swagger(app)

if __name__ == "__main__":
    app.run(debug=True)
