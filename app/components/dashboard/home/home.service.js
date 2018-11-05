angular.module('chapp')
  .factory('homeService', ['appConfig', '$resource', function (appConfig, $resource) {
    return {
      resource: function () {
        return $resource(appConfig.serviceUrl + '/lang', {
          id: '@_id'
        }, {
            sendMail: {
              method: 'POST',
              url: appConfig.serviceUrl + '/api/mailsend'
            }
          })
      }
    }
  }]);