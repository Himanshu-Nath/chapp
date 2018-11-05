angular.module('chapp')
  .factory('registerService', ['appConfig', '$resource', function (appConfig, $resource) {
    return {
      resource: function () {
        return $resource(appConfig.serviceUrl + '/lang', {
          id: '@_id'
        }, {
            registerUser: {
              method: 'POST',
              url: appConfig.serviceUrl + '/api/user/register'
            }
          })
      }
    }
  }]);