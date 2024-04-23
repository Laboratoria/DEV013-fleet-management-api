import json
from flask import Flask, request, jsonify
from markupsafe import escape
from conection_postgrestsql import connection

app = Flask(__name__)

# @app.route("/")
# def index():
#     return "<p>Index</p>"

# como hacer que flask reciba parametros en el end point
# how to receive queryparams in a flask endpont
@app.route("/", methods=["GET"])
def getting_taxis(pages, limit):
   crsr = connection.cursor()
    # limite * pagina
    # imprime de allí hasta eso + el limite
   crsr.execute("SELECT * from taxis")
   tuples_taxis = crsr.fetchall()
   dicts_taxis = [{"id": taxi[0], "plate": taxi[1]} for taxi in tuples_taxis]
   json_taxis = json.dumps(dicts_taxis)
   print(json_taxis)
   return json_taxis

# @app.route("/taxis", methods=["GET"])
# def getting_a_taxi():
#    crsr = connection.cursor()
#    print("X")
#    crsr.execute("SELECT version()")
#    db_version = crsr.fetchone()
#    print(db_version)
#    return "<p>taxis</p>"

# como hacer apis que reciben argumentos

# TODO why is this needed?
if __name__ == "__main__":
    app.run(debug=True)

# @app.route("/taxis/<id>")
# def show_taxi_id(id):
#     return f"Taxi {escape(id)}"
# @app.route('/taxis/<string:taxi_plate>')
# def show_post(post_id):
#     return f'Post {post_id}'

# @app.errorhandler(404)
# def page_not_found(error):
#     return 'page_not_found.html', 404

