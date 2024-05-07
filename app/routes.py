from flask import Flask, jsonify, json, request
from db_servings import get_taxi_from_db, get_trajectories_from_db
from serializers import taxis_serializer, trajectories_serializer
from conection_postgrestsql import connection

app = Flask(__name__)

@app.route("/")
def home_page():
   print("home")
   return "Home"

@app.route("/taxis", methods=["GET"])
def get_taxis():
   tuples_taxis = get_taxi_from_db()
   dicts_taxis = taxis_serializer(tuples_taxis)
   return jsonify(dicts_taxis)

# ToDo qué hace @app.route
@app.route("/trajectories", methods=["GET"])
def get_trajectories():
   tuples_trajectories = get_trajectories_from_db()
   dicts_trajectories = trajectories_serializer(tuples_trajectories)
   json_trajectories = jsonify(dicts_trajectories)
   return json_trajectories

if __name__ == "__main__":
    app.run(debug=True)