angular.module('chapp')
.factory('headerService', ['appConfig', '$resource', function (appConfig, $resource) {
  return {
    resource: function () {
      return $resource(appConfig.serviceUrl + '/api/user/logout', {
        id: '@_id'
      }, {
        logoutUser: {
            method: 'PUT',
            url: appConfig.serviceUrl + '/api/user/logout/:emailId'
          }
        })
    }
  }
}]);