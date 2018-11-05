angular.module('techDocket')
.directive('modalBox', [
	function() {
		return {
			scope: {
				news : '=',
				category : '=',
				project : '@projectId',
				terms : '@termsConditions'
			},
			restrict : "E",
			templateUrl : 'app/directives/modalBox/modalBox.view.html',
			controller: 'modalBoxController'
		}
	}])
	
.controller('modalBoxController', ['$scope', '$uibModal',
	function($scope, $uibModal) {
		/**
		 * Shows news details in modal popup
		 * @param {*} offer 
		 */
		$scope.createPopupBox = function (offer, size) {
			$uibModal.open({
				controller: 'modalNewsController',
				controllerAs: 'MNCtrl',
				templateUrl: 'modalNews.html',
				size: size,	
				resolve: {
					newsData : function() {
						return offer;
					}
				}
			});
		}
	}
]);