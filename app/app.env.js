var APP = APP || {};
if(~location.host.indexOf("localhost")) {
	APP.config = {
		//'serviceUrl' : 'http://localhost:3030'
		'serviceUrl' : 'http://'+ location.host
	};
} else {
	APP.config = {
		'serviceUrl' : 'https://'+ location.host
	};
}

