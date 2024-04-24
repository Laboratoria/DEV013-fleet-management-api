from flask import Flask, jsonify, request
#request servirá para configurar los parámetros
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://default:Hs1ODnhjr2lU@ep-holy-sunset-a405zt5y-pooler.us-east-1.aws.neon.tech/verceldb'
db = SQLAlchemy(app)

# Initialize Swagger
swagger = Swagger(app)

# Define the Taxi model
class Taxi(db.Model):
    """Model representing a Taxi."""
    __tablename__ = 'taxis'
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), nullable=False)

@app.route("/")
def root():
   return "This is root"

# Route to show all taxis
@app.route('/taxis', methods =['GET'])
def show_taxis():
    """
    Endpoint to get all taxis.

    ---
    responses:
      200 :
        description: A JSON array of all taxis.
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                description: The taxi ID.
              plate:
                type: string
                description: Plate of the taxi.
    """
    taxis = Taxi.query.all()
    return jsonify([{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis])


if __name__ == "__main__":
    app.run(debug=True)




