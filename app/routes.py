from flask import Flask, jsonify, json, request
from models import taxi_model, trajectories_model
from serializers import taxis_serializer, trajectories_serializer
from conection_postgrestsql import connection

app = Flask(__name__)

@app.route("/")
def home_page():
   print("home")
   return "Home"

@app.route("/taxis", methods=["GET"])
def getting_taxis():
   tuples_taxis = taxi_model()
   dicts_taxis = taxis_serializer(tuples_taxis)
   return jsonify(dicts_taxis)

@app.route("/trajectories", methods=["GET"])
def getting_trajectories():
   tuples_trajectories = trajectories_model()
   dicts_trajectories = trajectories_serializer(tuples_trajectories)
   # print(dicts_trajectories)
   json_trajectories = jsonify(dicts_trajectories)
   # print(json_trajectories)
   print(json_trajectories)
   return json_trajectories

if __name__ == "__main__":
    app.run(debug=True)