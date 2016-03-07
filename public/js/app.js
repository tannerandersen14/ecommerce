angular.module('eCommerce', ['ui-router'])

angular.module('eCommerce').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html',
      controller: 'mainCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: '/views/products.html',
      controller: 'mainCtrl'
    })

})
