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
        });

      $stateProvider
        .state('products', {
          url: '/products',
          templateUrl: 'app/start/start.html',
          controller: 'StartController',
          controllerAs: 'main'
        });

      $urlRouterProvider.otherwise('/');
    }

  }
}
