angular.module('techDocket')
.controller('modalNewsController', ['$uibModalInstance', 'newsData',
	function($uibModalInstance, newsData) {

        this.newsDescription = newsData;		  	
        this.ok = function() {
            $uibModalInstance.close('yes');
        }
    }
]);