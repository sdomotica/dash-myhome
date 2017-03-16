//configuration ZONW
//BTicino webserver config
var HOST = '192.168.1.35';
var PORT = 20000;

//your dash buttons
var DASH_BUTTONS = [
		"ac:63:be:fe:93:e3", //nobo
		"84:d6:d0:8c:ac:94" //barilla
		];

var COMMANDS = [
		"*1*1*12##",
		"*1*0*12##",
		];


//End of configuration no modification needed below

//Socket Zone
var net = require('net');
var client = new net.Socket();

function send_own (frame){
	client.connect(PORT, HOST, function() {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		client.write('*99*9##' + frame);
	});

	client.on('data', function(data) {
		console.log('DATA: ' + data);
		client.destroy();
	});

	client.on('close', function() {
		console.log('Connection closed');
	});

}



//Dash zone
var dash_button = require('node-dash-button');
var dash = dash_button(DASH_BUTTONS, null, null, 'all');
dash.on("detected", function (dash_id){
	var a = DASH_BUTTONS.indexOf(dash_id);
	var OWN = COMMANDS[a]
	if (OWN != undefined){
		console.log(OWN);
		send_own(OWN)
	}else {
		console.log("No OWN commands for found Dash Button");
	}
	
});
