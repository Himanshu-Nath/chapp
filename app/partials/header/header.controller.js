angular.module('chapp')
.controller('headerController', ['$state', '$rootScope', 'headerService', 'localStorageService', 'toastAlert', 'appConfig',
	function($state, $rootScope, headerService, localStorageService, toastAlert, appConfig) {

	var vm = this;
	var toast = toastAlert;
	let data = {};

	vm.logout = function() {
		$rootScope.viewSpinner = true;
		headerService.resource(appConfig).logoutUser({
			"emailId": localStorageService.get("USER_PROFILE").email
		}, data,
		function(response){
			$rootScope.viewSpinner = false;
			console.log(response);
			localStorageService.clearAll();
			if(response.status) {
			  toast({
				type: 'success',
				title: 'User successfully logout'
			  });
			  $state.go('login');
			} else {
			  toast({
				type: 'error',
				title: 'Failed to logout'
			  });
			}
		}, function(error){
			$rootScope.viewSpinner = false;
			console.log(error);
			toast({
			  type: 'error',
			  title: error.data.devMessage
			});
		})
	  }
	
	$('.nav li a').click(function(e) {		
		$('.nav li.active').removeClass('active');

		var $parent = $(this).parent();
		$parent.addClass('active');
		e.preventDefault();
	});

}]);