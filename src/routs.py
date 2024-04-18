from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def index():
    return "<p>Index</p>"

@app.route("/taxis/<id>")
def show_taxi_id(id):
    return f"Taxi {escape(id)}"