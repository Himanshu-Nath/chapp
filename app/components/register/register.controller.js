angular.module('chapp')
  .controller('registerController', ['$state', '$rootScope', 'registerService', 'toastAlert', 'appConfig', '$scope', 'LoginType',
  function ($state, $rootScope, registerService, toastAlert, appConfig, $scope, LoginType) {
    var vm = this;
    var toast = toastAlert;

    vm.register = function() {
      console.log(vm.user);
      $rootScope.viewSpinner = true;
      registerService.resource(appConfig).registerUser({
          name: vm.user.name,
          email: vm.user.email,
          mobile: vm.user.mobile,
          password: vm.user.password,
          loginType: LoginType.web,
          gender: vm.user.gender,
      },
      function(response){
          $rootScope.viewSpinner = false;
          console.log(response);
          if(response.status) {
            toast({
              type: 'success',
              title: vm.user.name + ' successfully register'
            });
            $state.go('login');
          } else {
            toast({
              type: 'error',
              title: 'Failed to register'
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
  }
  ]);
