from subprocess import PIPE, Popen

TAB = "\t"
NL = "\n"


'''
Returns an array of the system's sinks in the following format:

[
  {
    "name": "alsa_output.pci-000_00.1b.analog-stereo",
    "id": "0"
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
Returns an array of objects which represent all loaded pulse audio modules.

"modules": [
  {
    "name": "",
    "id": 0,
    "args": {
      "arg0": "value0",
      "arg1": "value1",
    }
  }
]
'''
def get_modules():
    get_modules_args = ["pactl" , "list" , "short" , "modules"]
    process = Popen(get_modules_args, stdout=PIPE, universal_newlines=True)
    stdout, stderr = process.communicate(input=None, timeout=5)

    modules = []
    lines = stdout.split(NL)[:-1]
    for line in lines:
        module = {}
        chunks = line.split(TAB)[:-1]
        module['id'] = chunks[0]
        module['name'] = chunks[1]
        if chunks[2] != '':
            arg_string = chunks[2].split(' ')
            args = {}
            for arg in arg_string:
                arg_chunk = arg.split('=')
                args[arg_chunk[0]] = arg_chunk[1].replace('"', '')
            module['args'] = args
        modules.append(module)
    return modules

'''
Returns an array of tunnel sinks in the following format:

[
  {
    "module":"0",
    "name":"My-tunnel",
    "server":"10.0.0.1:1111",
    "sink":"0",
  },
]
'''
def get_sink_tunnels():
    # Tunnels are modules of type "module-tunnel-sink-new".
    return [mod for mod in get_modules() if mod["name"] == "module-tunnel-sink-new"]


'''
Returns an array of module information for "module-tunnel-sinks-new" in the
following format:

[
  {
    "module":0,
    "name":"module-native-protocol-tcp",
    "port":"1111",
    "auth-anonymous":"1",
  },
]
'''
def get_gates():
    # Gates are the modules of type "module-native-protocol-tcp"
    return [mod for mod in get_modules() if mod['name'] == "module-native-protocol-tcp"]
