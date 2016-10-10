from subprocess import PIPE, Popen

TAB = "\t"
NL = "\n"


'''
Returns an array of the system's sinks in the following format:

[
    {
        "id": "0"
        "name": "alsa_output.pci-000_00.1b.analog-stereo",
        "description": "Built-in Audio Analog Stereo",
        "state": "RUNNING",
    },
    {
        "id": "3"
        "name": "null",
        "description": "Null Output",
        "state": "SUSPENDED",
    }
]
'''
def get_sinks():
    list_sinks_args = ["pactl", "list", "sinks"]
    process = Popen(list_sinks_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)
    sinks = []
    # Get attributes one sink at a time.
    for sink in stdout.split("Sink #")[1:]:
        lines = sink.split(NL)
        id = lines[0]
        attrs = {"id": int(id)}
        # Parse attributes line by line.
        for line in sink.split(NL)[1:]:
            chunks = line.strip(TAB).split(": ")
            # Only add the following fields to attributes dict.
            if chunks[0] in ["Name", "Description", "State"]:
                attrs[str(chunks[0]).lower()] = chunks[1]
        # Assign attributes to a sink identified by sink number.
        sinks.append(attrs)
    return sinks


def get_sinks_short():
    list_sinks_short_args = ["pactl", "list", "short", "sinks"]
    process = Popen(list_sinks_short_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)
    return {"sinks": [{sink.split(TAB)[0]: sink.split(TAB)[1:]} for sink in stdout.split(NL) if sink is not ""]}


def open_sink_server(port):
    open_sink_server_args = [ "pactl"
                            , "load-module"
                            , "module-native-protocol-tcp"
                            , "port=" + str(port)
                            , "auth-anonymous=1"
                            ]
    process = Popen(open_sink_server_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)
    return {"status": stdout}


def open_sink_tunnel(name, server, sink):
    open_sink_tunnel_args = [ "pactl"
                            , "load-module"
                            , "module-tunnel-sink-new"
                            , "sink_name=" + str(name)
                            , "server=" + str(server)
                            , "sink=" + str(sink)
                            ]
    process = Popen(open_sink_tunnel_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)
    return {"status": stdout}


print(get_sinks())