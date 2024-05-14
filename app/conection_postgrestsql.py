import psycopg2
import os

def connection():
    connection = psycopg2.connect(
    host = os.getenv("POSTGRES_HOST"),
    user = os.getenv("POSTGRES_USER"),
    password = os.getenv("POSTGRES_PASSWORD"),
    database = os.getenv("POSTGRES_DATABASE"),
    port = 5432
    )
    return connection

def close_crsr():
    crsr = connection().cursor()
    closed = crsr.close()
    return closed