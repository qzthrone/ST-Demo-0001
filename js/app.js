var websocketclient = {

	"connected": false,

	"connect" : function () {
		var server = document.getElementById("server").value;
		var port = document.getElementById("port").value;
		var path = document.getElementById("path").value;
		var clientID = document.getElementById("clientID").value;
		this.client = new Paho.MQTT.Client(server, Number(port), path, clientID);
		this.client.onMessageArrived = this.onMessageArrived;

		var options = {
			timeout: 3,
			onSuccess: this.onConnect,
			onFailure: this.onFail
		};

		this.client.connect(options);
		document.getElementById("info").innerText = "Server connecting...";

	},

	"onConnect": function () {
		websocketclient.connected = true;
		document.getElementById("info").innerText = "Server connected";
		console.log("server connected");
	},

	"onFail": function (message) {
		websocketclient.connected = false;
		document.getElementById("info").innerText = "Connection Error: "+message.errorMessage;
	},

	"onSubscribe": function () {
		document.getElementById("info").innerText = "Subscribed to "+document.getElementById("topic").value;
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
				document.getElementById("info").innerText = "Step In: "+pinPoint;
				floor.mark(pinPoint);
				break;
			case 2:
				document.getElementById("info").innerText = "Step Out: "+pinPoint;
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
