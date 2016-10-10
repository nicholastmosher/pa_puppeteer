from flask_restful import fields

sink_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "state": fields.String,
    "description": fields.String,
}


def get_sink_model():
    return dict(sink_fields)
