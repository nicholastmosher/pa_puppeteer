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
        "state": "RUNNING"
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


'''
Opens a port for third-party pulse audio clients to connect to sinks
on this local device using the native-protocol-tcp module.
'''
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


'''
Establishes a "tunnel" sink that streams audio to a remote pulse audio server.
'''
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


'''
Returns an array of loaded modules for this client, represented as
arrays of each module name and the active parameters loaded for those
modules.
'''
def get_modules():
    get_modules_args = ["pactl" , "list" , "short" , "modules"]
    process = Popen(get_modules_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)

    # Modules are split on each line, represented as an array split on tabs.
    return [out.split("\t") for out in stdout.split("\n")][:-1]


'''
Returns an array of tunnel sinks in the following format:

[
    {
        "module":0,
        "name":"My-tunnel",
        "server":"10.0.0.1:1111",
        "sink":0
    }
]
'''
def get_sink_tunnels():
    modules = get_modules()

    # Tunnels are modules of type "module-tunnel-sink-new".
    tunnels = [tunnel[:-1] for tunnel in [mod for mod in modules if mod[1] == "module-tunnel-sink-new"]]
    tun_dicts = []
    for tunnel in tunnels:
        # Arguments delimited by spaces, each is name=value.
        args = [{"name":arg.split("=")[0],"value":arg.split("=")[1]} for arg in tunnel[2].split(" ")]
        tun = {
            "module":tunnel[0],
            "name":args[0]["value"],
            "server":args[1]["value"],
            "sink":args[2]["value"]
        }
        tun_dicts.append(tun)
    return tun_dicts


'''
Returns an array of module information for "module-tunnel-sinks-new" in the
following format:

[
    {
        "module":0,
        "name":"module-native-protocol-tcp",
        "port":1111,
        "auth-anonymous":1
    }
]
'''
def get_gates():
    modules = get_modules()

    # Gates are the modules of type "module-native-protocol-tcp"
    gates = [gate[:-1] for gate in [mod for mod in modules if mod[1] == "module-native-protocol-tcp"]]
    print(gates)
    gates_dicts = []
    for gate in gates:
        if gate[2] == "":
            continue
        # Arguments delimited by spaces, each is name=value.
        args = [{"name":arg.split("=")[0],"value":arg.split("=")[1]} for arg in gate[2].split(" ")]
        print(args)
        gate = {
            "module":int(gate[0]),
            "name":gate[1],
            "port":int(args[0]["value"]),
            "auth-anonymous":int(args[1]["value"]),
        }
        gates_dicts.append(gate)
    return gates_dicts
