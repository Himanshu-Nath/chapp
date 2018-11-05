angular.module('chapp')
  .factory('loginService', ['appConfig', '$resource', function (appConfig, $resource) {
    return {
      resource: function () {
        return $resource(appConfig.serviceUrl + '/lang', {
          id: '@_id'
        }, {
          loginUser: {
              method: 'POST',
              url: appConfig.serviceUrl + '/api/user/login'
            }
          })
      }
    }
  }]);