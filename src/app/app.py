import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flasgger import Swagger
from .models import db,Taxi

load_dotenv()
app = Flask(__name__)

# Get the PostreSQL connection URI from enviroment variables
postgres_url = os.getenv('POSTGRES_URL')

if not postgres_url:
    raise ValueError("POSTGRES_URL not found in environment variables.")

# Configure the connection URI in Flask application
app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Configure Flasgger
swagger = Swagger(app)

DEFAULT_PAGE = 1
DEFAULT_PER_PAGE = 10

# Route to list all taxis
@app.route('/taxis', methods=['GET'])
def get_taxis():
    """
    Gets the list of all taxis.
    ---
    parameters:
      - name: page
        in: query
        type: integer
        required: false
        description: Page number for pagination.
      - name: per_page
        in: query
        type: integer
        required: false
        description: Number of items per page.
    responses:
      200:
        description: A list of taxis.
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                description: The ID of the taxi.
              plate:
                type: string
                description: The license plate of the taxi.
    """
    # Pagination parameters
    page = int(request.args.get('page', DEFAULT_PAGE))
    per_page = int(request.args.get('per_page', DEFAULT_PER_PAGE))

    # Calculate start and end index for pagination
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    # Query taxis from the database 
    taxis = Taxi.query.all()

    # Get the subset of taxis for the current page
    taxis_subset = taxis[start_index:end_index]

    # Convert taxis to JSON format
    taxis_list = [{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis_subset]
    # return jsonify({
    #     'taxis': taxis_list,
    #     'total_taxis': taxis.total,
    #     'current_page': page,
    #     'per_page': per_page
    # })
    return jsonify(taxis_list)

if __name__ == "__main__":
    app.run(debug=True)
