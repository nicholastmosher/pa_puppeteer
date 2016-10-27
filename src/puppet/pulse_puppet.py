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


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


class InfoAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        pass


    def get(self):
        return jsonify({"status":"online"})


class SinksAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument('name',
                                         type=str,
                                         required=True,
                                         help='No sink name provided',
                                         location='json')
        super(SinksAPI, self).__init__()

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


class SinkAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument('name',
                                         type=str,
                                         location='json')
        super(SinkAPI, self).__init__()

    '''
    GET endpoint for retrieving sink information for a specific sink.
    Returns data in the following format:
    {
      "sink": {
        "description": "Built-in Audio Analog Stereo",
        "id": 0,
        "name": "alsa_output.pci-0000_00.1b.0.analog-stereo",
        "state": "RUNNING"
      }
    }
    '''
    def get(self, id):
        sinks = painter.get_sinks()
        sink = [sink for sink in sinks if sink["id"] == str(id)]
        if len(sink) == 0:
            abort(404)
        return jsonify({"sink": sink[0]})


class ModulesAPI(Resource):

    def __init__(self):
        self.request_parser = reqparse.RequestParser()

    def get(self):
        return jsonify({"modules": painter.get_modules()})


class ModuleAPI(Resource):

    def __init__(self):
        self.request_parser = reqparse.RequestParser()

    def get(self, id):
        modules = painter.get_modules()
        module = [mod for mod in modules if mod[0] == id]
        if len(module) == 0:
            abort(404)
        return jsonify({"module": module[0]})


class TunnelAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument("name", type=str, required=True, location="json",
                                         help="No tunnel name provided")
        self.request_parser.add_argument("server", type=str, required=True, location="json",
                                         help="No server provided")
        self.request_parser.add_argument("sink", type=int, required=True, location="json",
                                         help="No sink number provided")


    '''
    GET endpoint for retrieving information about sinks that are remote tunnels.
    Returns data in the following format:
    {
        "tunnels": [
            {
                "module":0,
                "name":"My-tunnel",
                "server":"10.0.0.1:1111",
                "sink":0
            }
        ]
    '''
    def get(self):
        return jsonify({"tunnels":painter.get_sink_tunnels()})


    '''
    POST endpoint for opening remote or "tunneled" sinks.

    Request must be made in the following format:
    {
        "name":"my-tunneled-sink",
        "server":"127.0.0.1:1234",
        "sink":0
    }

    Response will be made in the following format:
    {
        "status":"status message from pulse audio"
    }
    '''
    def post(self):
        args = self.request_parser.parse_args()
        name = args["name"]
        server = args["server"]
        sink = args["sink"]
        print("Name:" + name + ", server: " + server + ", sink: " + str(sink))
        status = painter.open_sink_tunnel(name, server, sink)
        return jsonify({"status":status})


class GateAPI(Resource):
    decorators = [auth.login_required]

    def __init__(self):
        self.request_parser = reqparse.RequestParser()
        self.request_parser.add_argument("port",
                                         type=int,
                                         required=True,
                                         location="json",
                                         help="No port provided")


    '''
    GET endpoint for retrieving information about exposed "gates" for connecting tunnels to.
    Response is given in the following format:

    {
        "gates": [
            {
                "module":0,
                "name":"module-native-protocol-tcp",
                "port":1111,
                "auth-anonymous":1
            }
        ]
    }
    '''
    def get(self):
        return jsonify({"gates":painter.get_gates()})


    '''
    POST endpoint for exposing access to local sinks using native-protocol-tcp.
    Request must be made in the following format:

    {
        "port":1234
    }
    '''
    def post(self):
        args = self.request_parser.parse_args()
        port = args["port"]
        print("Port for gate: " + str(port))
        status = painter.open_sink_server(port)
        return jsonify({"status":status})


api.add_resource(InfoAPI,     "/v1/info",             endpoint="info")
api.add_resource(SinksAPI,    "/v1/sinks",            endpoint="sinks")
api.add_resource(SinkAPI,     "/v1/sinks/<int:id>",   endpoint="sink")
api.add_resource(ModulesAPI,  "/v1/modules",          endpoint="modules")
api.add_resource(ModuleAPI,   "/v1/module/<int:id>",  endpoint="module")
api.add_resource(TunnelAPI,   "/v1/modules/tunnels",  endpoint="tunnel")
api.add_resource(GateAPI,     "/v1/modules/gates",    endpoint="gate")

if __name__ == "__main__":
    app.run()