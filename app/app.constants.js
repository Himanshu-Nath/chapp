angular.module('chapp')
.constant('appConfig', {
	'version': 1.0,
	'serviceUrl' : APP.config.serviceUrl 
})
.constant('constUrls', {
	'textToSpeech' : '/api/textToSpeech',
	'speechToText' : '/api/speechToText'
})
.constant('LoginType', {
	'web' : 'WEB',
	'google' : 'google'
})