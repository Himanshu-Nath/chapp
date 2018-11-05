angular.module("chapp")
.config(['$provide', function($provide) {
   $provide.provider('toastAlert', function() {
      this.$get = function() {
        var toast = swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 5000
          });
         return toast;
      };
   });
}]);