/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  /** @ngInject */
  export function product(): ng.IDirective {

    return {
      restrict: 'E',
//      scope: {
//        creationDate: '='
//      },
      templateUrl: 'app/components/product/product.html',
      controller: ProductController,
      controllerAs: 'pctdct',
      bindToController: true
    };

  }

  /** @ngInject */
  class ProductController {

    constructor(moment: moment.MomentStatic, $location: ng.ILocationService, $modal: any) {
      console.log("ProductController");
    }
  }
}
