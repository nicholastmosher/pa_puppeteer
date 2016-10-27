/**
 * Defines a Puppet Node for pa_puppeteer. Gives a name, description, server, and port
 * @param name The display name for this puppet node.
 * @param description The readable description of this node.
 * @param server The hostname or ip used to connect to this node.
 * @param port The port used to connect to this node.
 */
function Node(name, description, server, port) {
    var self = this;
    self.name = name;
    self.description = description;
    self.server = server;
    self.port = port;
    self.connected = false;
    self.sinks = [];

    self.ajax = function(uri, method, data) {
        var request = {
            url: uri,
            type: method,
            contentType: "application/json",
            accepts: "application/json",
            // cache: false,
            // dataType: 'json',
            // data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " +
                    btoa("nick" + ":" + "something"));
            },
            error: function(jqXHR) {
                console.log("Ajax error " + jqXHR.status);
            }
        };
        return $.ajax(request);
    };

    self.connect = function() {
        var uri = "http://" + self.server() + ":" + self.port() + "/v1/info";
        self.ajax(uri, "GET").done(function(data) {
            console.log("Returned from connect request.");
            console.log(data);
        });
    }
}

/**
 * Defines the View Model for displaying Nodes.
 */
function NodesViewModel() {
    var self = this;
    self.username = "nick";
    self.password = "something";
    self.nodes = ko.observableArray();

    /**
     * Displays the "add node" modal.
     */
    self.beginAddNode = function() {
        $('#addNodeModal').modal('show');
    };

    /**
     * Adds a node to the observable array of nodes.
     * @param node The node object to add to the observable array.
     */
    self.addNode = function(node) {
        self.nodes.push(node);
    };

    /**
     * Displays the "edit node" modal.
     */
    self.beginEditNode = function() {
        $('#editNodeModal').modal('show');
    };
}

/**
 * Defines the View Model for the modal that allows adding new Nodes.
 *
 * The name, hostname, server, and port member variables are bound by
 * knockout.js to corresponding data-bind attributed elements in the
 * #addNodeModal element.
 */
function AddNodeViewModel() {
    var self = this;
    self.name = ko.observable();
    self.hostname = ko.observable();
    self.server = ko.observable();
    self.port = ko.observable();

    /**
     * Creates a new Node object with the knockout observables in their
     * current state in the "add node" modal, and reconstructs the
     * observables that are bound to the html elements.
     */
    self.addNode = function() {
        $('#addNodeModal').modal('hide');
        nodesModel.addNode(new Node(
            self.name,
            self.hostname,
            self.server,
            self.port
        ));
        self.name = ko.observable();
        self.hostname = ko.observable();
        self.server = ko.observable();
        self.port = ko.observable();
    }
}

var nodesModel = new NodesViewModel();
var addNodesModel = new AddNodeViewModel();
ko.applyBindings(nodesModel, $('#main')[0]);
ko.applyBindings(addNodesModel, $('#addNodeModal')[0]);
