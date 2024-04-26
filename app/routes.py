from flask import Flask, jsonify
from models import taxi_model
# import json
# from markupsafe import escape
# from conection_postgrestsql import connection
# from flask_paginate import Pagination, get_page_args

app = Flask(__name__)

@app.route("/", methods=["GET"])
def getting_taxis():
   tuples_taxis = taxi_model()
   dicts_taxis = [{"id": taxi[0], "plate": taxi[1]} for taxi in tuples_taxis]
   json_taxis = jsonify(dicts_taxis)
   
   return json_taxis



# @app.route("/trajectories", methods=["GET"])
# def getting_trajectories():
# #    limit = request.args.get("limit", default=10)
# #    page = request.args.get("page", default=1)
# #    date = request.args.get("date")
   
#    crsr = connection.cursor()
# #    crsr.execute(f"SELECT * FROM trajectories ORDER BY {id} ASC LIMIT {limit} OFFSET {page};")
#    crsr.execute(f"SELECT * FROM trajectories WHERE taxi_id='6418' ORDER BY taxi_id;")
#    tuples_trajectories = crsr.fetchall()
# #    dicts_trajectories = [{"latitude": taxi[2], "longitude": taxi[3]} for taxi in tuples_trajectories]
# #    json_trajectories = json.dumps(dicts_trajectories)
#    dicts_dates = [{"date": taxi[2]} for taxi in tuples_trajectories]
#    json_dates = json.dumps(dicts_dates)

# #    return json_trajectories
#    print(json_dates)
#    return "<p>Trajectories</p>"   

if __name__ == "__main__":
    app.run(debug=True)