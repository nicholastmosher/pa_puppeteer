#!/usr/bin/env python3

from flask import Flask, jsonify, abort
from flask_restful import Api, Resource, reqparse, marshal
from flask_httpauth import HTTPBasicAuth

import pulse_interface as painter
import pulse_models as pamodels

app = Flask(__name__)
api = Api(app)
auth = HTTPBasicAuth()


@auth.get_password
def get_password(username):
    if username == 'nick':
        return 'something'
    return None


@auth.error_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access'})


class SinkListAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument('name',
                                         type=str,
                                         required=True,
                                         help='No sink name provided',
                                         location='json')
        super(SinkListAPI, self).__init__()

    '''
    GET endpoint for retrieving sink information.
    Returns data in the following format:
    {
      "sinks": [
        {
          "description": "Built-in Audio Analog Stereo",
          "id": 0,
          "name": "alsa_output.pci-0000_00_1b.0.analog-stereo",
          "state": "RUNNING"
        },
        {
          "description": "Null Output",
          "id": 1,
          "name": "null",
          "state": "SUSPENDED"
      ]
    }
    '''
    def get(self):
        return jsonify(
            {
                "sinks": [
                    marshal(sink, pamodels.get_sink_model())
                    for sink in painter.get_sinks()
                ]
            }
        )


    '''
    GET endpoint for retrieving sink information for a specific sink.
    Returns data in the following fomrat:
    {
      "sink": {
        "description": "Built-in Audio Analog Stereo",
        "id": 0,
        "name": "alsa_output.pci-0000_00.1b.0.analog-stereo",
        "state": "RUNNING"
      }
    }
    '''
class SinkAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument('name',
                                         type=str,
                                         location='json')
        super(SinkAPI, self).__init__()

    def get(self, id):
        sinks = painter.get_sinks()
        sink = [sink for sink in sinks if sink["id"] == id]
        if len(sink) == 0:
            abort(404)
        return jsonify({"sink": sink[0]})


api.add_resource(SinkListAPI, '/v1/sinks', endpoint='sinks')
api.add_resource(SinkAPI, '/v1/sinks/<int:id>', endpoint='sink')

if __name__ == "__main__":
    app.run()
