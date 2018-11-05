angular.module('chapp')
  .controller('loginController', ['$state', '$rootScope', 'loginService', 'localStorageService', 'toastAlert', 'appConfig', '$scope',
  function ($state, $rootScope, loginService, localStorageService, toastAlert, appConfig, $scope) {
    var vm = this;
    var toast = toastAlert;

    vm.login = function() {
      console.log(vm.user);
      $rootScope.viewSpinner = true;
      loginService.resource(appConfig).loginUser({
          email: vm.user.email,
          password: vm.user.password
      },
      function(response){
          $rootScope.viewSpinner = false;
          console.log(response);
          let userProfile = {
            token: response.token,
            name: response.result.name,
            activeStatus: response.result.currently_active,
            email: response.result.email,
            gender: response.result.gender,
            mobile: response.result.mobile,
            role: response.result.role
          }
          localStorageService.set("USER_PROFILE", userProfile);
          if(response.status) {
            toast({
              type: 'success',
              title: vm.user.email + ' successfully login'
            });
            $state.go('dashboard.home');
          } else {
            toast({
              type: 'error',
              title: 'Failed to login'
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
