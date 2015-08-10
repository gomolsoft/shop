/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/navbar/navbar.directive.ts" />
/// <reference path="../app/components/malarkey/malarkey.directive.ts" />
/// <reference path="../app/components/webDevTec/webDevTec.service.ts" />
/// <reference path="../app/components/githubContributor/githubContributor.service.ts" />

/// <reference path="../app/components/user/login.controller.ts" />
/// <reference path="../app/components/user/login.service.ts" />

/// <reference path="../app/start/start.controller.ts" />

/// <reference path="../app/components/product/product.directive.ts" />
/// <reference path="../app/components/product/products.controller.ts" />

/// <reference path="../app/components/product/product.details.directive.ts" />
/// <reference path="../app/components/product/product.details.controller.ts" />

/// <reference path="../app/components/dataService/data.service.ts" />


declare var malarkey: any;
declare var toastr: Toastr;
declare var moment: moment.MomentStatic;

module shop {
  'use strict';

  angular.module('shop', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap'])
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)

    .config(Config)

    .config(RouterConfig)

    .config(['RestangularProvider',
      (RestangularProvider:restangular.IProvider) => {
          RestangularProvider.setBaseUrl('http://localhost:8090');
//          RestangularProvider.setBaseUrl('http://mbp.fritz.box:8080');
//          RestangularProvider.setBaseUrl('https://secure.mysmartthings.de/api');
      }
    ])

    .run(RunBlock)

    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('UserLoginService', UserLoginService)
    .service('DataProvider', DataProvider)

//    .controller('MainController', MainController)
    .controller('StartController', StartController)
    .controller('LoginController', LoginController)
    .controller('ProductsController', ProductsController)
    .controller('ProductDetailsController', ProductDetailsController)

    .directive('productDetails', productDetails)
    .directive('acmeNavbar', acmeNavbar)
    .directive('product', product)
    .directive('acmeMalarkey', acmeMalarkey)
    .directive('mysmartthingsLogin', mysmartthingsLogin)

  ;
}
