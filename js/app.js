var websocketclient = {

	"connected": false,

	"connect" : function () {
		var server = document.getElementById("broker-url").value;
		var port = document.getElementById("broker-port").value;
		var path = "/"+document.getElementById("broker-path").value;
		var clientID = document.getElementById("broker-client").value;
		this.client = new Paho.MQTT.Client(server, Number(port), path, clientID);
		this.client.onMessageArrived = this.onMessageArrived;

		var options = {
			timeout: 3,
			onSuccess: this.onConnect,
			onFailure: this.onFail
		};

		this.client.connect(options);
		document.getElementById("debug-info").innerText = "Server connecting...";

	},

	"onConnect": function () {
		websocketclient.connected = true;
		document.getElementById("debug-info").innerText = "Server connected";
		console.log("server connected");
	},

	"onFail": function (message) {
		websocketclient.connected = false;
		document.getElementById("debug-info").innerText = "Connection Error: "+message.errorMessage;
	},

	"onSubscribe": function () {
		document.getElementById("debug-info").innerText = "Subscribed to "+document.getElementById("broker-topic").value;
	},

	"onMessageArrived": function (message) {
		console.log("message received.");
		var msg = message.payloadString.split(",");
		var eventID = Number(msg[0]);
		console.log(eventID);
		var sensorID = Number(msg[1]);
		console.log(sensorID);
		var pinPoint = floor.sensorIDtoLocation(sensorID);
		switch(eventID) {
			case 1:
				document.getElementById("debug-info").innerText = "Step In: "+pinPoint;
				floor.mark(pinPoint);
				break;
			case 2:
				document.getElementById("debug-info").innerText = "Step Out: "+pinPoint;
				floor.unmark(pinPoint);
				break;
		}
	},

	"subscribe": function (topic) {
		var subscribeOptions = {
			qos: 0,
			//timeout: 10,
			onSuccess: this.onSubscribe
		};
		this.client.subscribe(topic, subscribeOptions);
	}
}
