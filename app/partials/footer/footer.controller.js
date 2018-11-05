angular.module('chapp')
.controller('FooterController', ['$scope', 'localStorageService',
	function($scope, localStorageService) {

	var vm = this;

	$(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.goto-top-btn').fadeIn();
        } else {
            $('.goto-top-btn').fadeOut();
        }
    });
    vm.gotoTop = function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    }

}])