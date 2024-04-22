
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://default:Hs1ODnhjr2lU@ep-holy-sunset-a405zt5y-pooler.us-east-1.aws.neon.tech/verceldb'

db = SQLAlchemy(app)

# Definir el modelo Taxi
class Taxi(db.Model):
    __tablename__ = 'taxis'
    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(20), nullable=False) 

@app.route("/")
def root():
    return "This is root"

# Ruta para mostrar todos los taxis
# @app.route('/taxis')
# def show_taxis():
#     taxis = Taxi.query.all()
#     return {'taxis': [{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis]}

@app.route('/taxis')
def show_taxis():
    taxis = Taxi.query.all()
    taxis_list = [{'id': taxi.id, 'plate': taxi.plate} for taxi in taxis]
    return jsonify({'taxis': taxis_list})

if __name__ == "__main__":
    app.run(debug=True)


