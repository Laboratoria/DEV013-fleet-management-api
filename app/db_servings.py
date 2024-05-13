import datetime
from datetime import datetime, timedelta
from flask import request
from conection_postgrestsql import connection

def get_taxi_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM taxis ORDER BY id ASC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()

# todo como le quito el between para pedir solo las de un solo dís como comparar el dia de un timestamp
def get_trajectories_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   taxi = request.args.get("taxi_id", default=6418)
   date = request.args.get("date", default='2008-02-02')
   date_format = datetime.strptime(date, '%Y-%m-%d').date()
   next_day = date_format + timedelta(days=1)
   print(date_format)
   print(next_day)
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM trajectories WHERE taxi_id={taxi} AND date(date) BETWEEN '{date_format}' AND '{next_day}' ORDER BY taxi_id ASC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()

# el cliente solo pide la ruta
# yo le entrego
# la ultima fecha registrada (por cada taxi)
# la ultima ubicacion
# sin importar la fecha
# aparece la ultima ubicacion de los 200 taxis
# taxi, placa, latitud, longitud, timestamp
def get_latest_from_db():
   limit = request.args.get("limit", default=10)
   page = request.args.get("page", default=1)
   crsr = connection.cursor()
   crsr.execute(f"SELECT * FROM taxis JOIN trajectories ON taxis.id = trajectories.taxi_id ORDER BY taxi_id ASC LIMIT {limit} OFFSET {page};")
   return crsr.fetchall()
#  ok ahora necesito la ultima
# sera que en vez de order by taxi haga order by date?


