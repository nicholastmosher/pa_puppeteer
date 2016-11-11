#!/usr/bin/env python3

from flask import Flask, jsonify, abort
from flask_restful import Api, Resource, reqparse, marshal
from flask_httpauth import HTTPBasicAuth
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
db = SQLAlchemy(app)
auth = HTTPBasicAuth()


@auth.get_password
def get_password(username):
    if username == 'nick':
        return 'something'
    return None


@auth.error_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access'})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


mUsers = [
    {
        "id": 1,
        "name": "Nick",
        "nodes": [
            {
                "name": "Obsidyn",
                "description": "My Laptop",
                "server": "localhost:5000"
            },
            {
                "name": "ADA",
                "description": "CSH server",
                "server": "ada.csh.rit.edu:5000"
            }
        ]
    },
    {
        "id": 2,
        "name": "Bob"
    }
]


class UsersAPI(Resource):

    def __init__(self):
        pass

    def get(self):
        return jsonify({"users": mUsers})


class UserAPI(Resource):

    def __init__(self):
        pass

    def get(self, id):
        users = [user for user in mUsers if user["id"] == id]
        if len(users) == 0:
            return jsonify({"error": "No user with id " + str(id)})
        return jsonify({"user": users[0]})


api.add_resource(UsersAPI, "/v1/users")
api.add_resource(UserAPI,  "/v1/users/<int:id>")

if __name__ == "__main__":
    app.run()
