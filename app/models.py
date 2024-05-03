from flask import request
from conection_postgrestsql import connection

def taxi_model():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM taxis ORDER BY id ASC LIMIT {limit} OFFSET {page};")
   tuples_taxis = crsr.fetchall()
   return tuples_taxis

def trajectories_model():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   # taxi = request.args.get("taxi_id", default=6418)
   # date = request.args.get("date", default="Sat Feb 02 2008 14:25:54 GMT-0600 (Central Standard Time)")
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM trajectories ORDER BY taxi_id ASC, date ASC LIMIT {limit} OFFSET {page};")
   tuples_trajectories = crsr.fetchall()
   return tuples_trajectories