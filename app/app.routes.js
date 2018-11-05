angular.module('chapp')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      //locationProvider
      $stateProvider
        .state('login', {
          url: '/login',
          controller: 'loginController',
          controllerAs: 'loginCTRL',
          templateUrl: 'app/components/login/login.view.html',
          authenticate: true
        })

        .state('register', {
          url: '/register',
          controller: 'registerController',
          controllerAs: 'registerCTRL',
          templateUrl: 'app/components/register/register.view.html',
          authenticate: true
        })

        .state('dashboard', {
          url: '/dashboard',
          controller: 'dashboardController',
          controllerAs: 'dashCTRL',
          templateUrl: 'app/components/dashboard/dashboard.view.html',
          authenticate: true
        })

        .state('dashboard.home', {
          url: '/home',
          controller: 'homeController',
          controllerAs: 'homeCTRL',
          templateUrl: 'app/components/dashboard/home/home.view.html',
          authenticate: true
        })

        $urlRouterProvider.otherwise('/login');
    }
  ])

  .run(['$rootScope', '$state', '$anchorScroll',
    function ($rootScope, $state, $anchorScroll) {
      $anchorScroll.yOffset = 50;
      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

      });
    }]);