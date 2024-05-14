from flask import Flask, jsonify
from .models.taxis import get_taxi_from_db
from .models.trajectories import get_trajectories_from_db, get_latest_from_db
from .utils import taxis_serializer, trajectories_serializer, latest_serializer
from .conection_postgrestsql import close_crsr

app = Flask(__name__)

@app.route("/")
def home_page():
   return "Home"

@app.route("/taxis", methods=["GET"])
def get_taxis():
   tuples_taxis = get_taxi_from_db()
   close_crsr()
   return jsonify(taxis_serializer(tuples_taxis))

# ToDo qué hace @app.route
@app.route("/trajectories", methods=["GET"])
def get_trajectories():
   tuples_trajectories = get_trajectories_from_db()
   close_crsr()
   return jsonify(trajectories_serializer(tuples_trajectories))

@app.route("/trajectories/latest", methods=["GET"])
def get_latest_trajectory():
   tuple_latest = get_latest_from_db()
   close_crsr()
   return jsonify(latest_serializer(tuple_latest))

if __name__ == "__main__":
    app.run(debug=True)