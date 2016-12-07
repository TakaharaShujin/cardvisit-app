angular
  .module('CardvisitApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'pages/layout.html',
        controller: 'LayoutController',
        controllerAs: 'vm'
      })
      .state('app.login', {
        url: '/login',
        templateUrl: 'pages/login/login.html',
        controller: 'loginController',
        controllerAs: 'vm'
      })

    .state('app.list', {
        url: '/',
        templateUrl: 'pages/list/list.html',
        controller: 'listController',
        controllerAs: 'vm'
      })
      .state('app.newcard', {
        url: '/new',
        templateUrl: 'pages/newCard/newcard.html',
        controller: 'newCardController',
        controllerAs: 'vm'
      })
      .state('app.editCard', {
        url: '/edit?card_id',
        templateUrl: 'pages/list/edit/editcard.html',
        controller: 'editCardController',
        controllerAs: 'vm'
      });
    $urlRouterProvider.otherwise('/login');
    $locationProvider.hashPrefix('!');
  });
