from flask import Flask, jsonify, json, request
from models import taxi_model
from serializers import taxis_serializer
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
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   taxi = request.args.get("taxi_id", default=6418)
   date = request.args.get("date", default="Sat Feb 02 2008 14:25:54 GMT-0600 (Central Standard Time)")
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM trajectories ORDER BY taxi_id ASC, date ASC LIMIT {limit} OFFSET {page};")
   tuples_trajectories = crsr.fetchall()
   dicts_trajectories = [{"taxi_id": taxi_id[1], "date": taxi_id[2], "latitude": taxi_id[3], "longitude": taxi_id[4]} for taxi_id in tuples_trajectories]
   # print(dicts_trajectories)
   json_trajectories = jsonify(dicts_trajectories)
   # print(json_trajectories)
   print(json_trajectories)
   return json_trajectories
   
# crsr.execute(f"SELECT * FROM trajectories WHERE taxi_id='6418' ORDER BY taxi_id;")
   
#    dicts_dates = [{"date": taxi[2]} for taxi in tuples_trajectories]
#    json_dates = json.dumps(dicts_dates)

# #    return json_trajectories
#    print(json_dates)
#    return "Trajectories"   

if __name__ == "__main__":
    app.run(debug=True)