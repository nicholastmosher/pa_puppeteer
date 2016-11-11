from server import db


class User(db.Model):
    id = db.Column('user_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __init__(self, name):
        self.name = name


class Node(db.Model):
    id = db.Column('node_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    desc = db.Column(db.String(250))

    def __init__(self, name, desc):
        self.name = name
        self.desc = desc


class Sink(db.Model):
    id = db.Column('sink_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    desc = db.Column(db.String(250))

    def __init__(self, name, desc):
        self.name = name
        self.desc = desc


class Server(db.Model):
    id = db.Column('server_id', db.Integer, primary_key=True)
    ip = db.Column(db.String(50))
    hostname = db.Column(db.String(150))

    def __init__(self, ip, hostname):
        self.ip = ip
        self.hostname = hostname
