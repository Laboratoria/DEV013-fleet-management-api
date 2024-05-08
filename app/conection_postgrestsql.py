import psycopg2
import os

# TODO definir estrategia para cerrar conexion
connection = psycopg2.connect(
    host = os.getenv("POSTGRES_HOST"),
    user = os.getenv("POSTGRES_USER"),
    password = os.getenv("POSTGRES_PASSWORD"),
    database = os.getenv("POSTGRES_DATABASE"),
    port = 5432
)

# Setting auto commit to True 
# connection.autocommit = True
  
# Creating a cursor object using the 
# cursor() method 
# cursor = connection.cursor() 

# connection.close()

# print(connection.is_connected())