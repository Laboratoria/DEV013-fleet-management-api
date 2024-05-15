import pytest
from app.routes import app

@pytest.fixture()
def url():
    """URL for test."""
    yield "http://127.0.0.1:5000"

@pytest.fixture()
def app():
    """App for tests"""
    app = app()
    # app.config.update({
    #     "TESTING": True,
    # })
    # other setup can go here
    yield app

#     # clean up / reset resources here


@pytest.fixture()
def client(app):
    """Client for tests"""
    yield app.test_client()

# @pytest.fixture()
# def runner(app):
#     return app.test_cli_runner()