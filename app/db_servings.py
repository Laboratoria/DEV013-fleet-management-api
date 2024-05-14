# import datetime
# from datetime import datetime, timedelta
from flask import request
from conection_postgrestsql import connection

def get_taxi_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM taxis ORDER BY id ASC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()

def get_trajectories_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   taxi = request.args.get("taxi_id", default=6418)
   date = request.args.get("date", default='2008-02-02')
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM trajectories WHERE taxi_id={taxi} AND CAST(date AS DATE) = '{date}' ORDER BY taxi_id ASC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()

def get_latest_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   crsr = connection.cursor()
   crsr.execute(f"SELECT DISTINCT ON (taxi_id) * FROM taxis JOIN trajectories ON taxis.id = trajectories.taxi_id ORDER BY taxi_id ASC, date DESC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()


