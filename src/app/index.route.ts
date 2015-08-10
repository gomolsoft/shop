module shop {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/start/start.html',
          controller: 'StartController',
          controllerAs: 'main'
        })

        .state('products', {
          url: '/products',
          templateUrl: 'app/components/product/products.html',
          controller: 'ProductsController',
          controllerAs: 'pctctrl'
        });

      $urlRouterProvider.otherwise('/');
    }

  }
}
