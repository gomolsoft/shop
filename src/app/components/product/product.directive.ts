/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  interface IProductScope extends ng.IScope {
    product: IProduct;
  }

  /** @ngInject */
  export function product(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'app/components/product/product.directive.html',
      controller: ProductController,
      controllerAs: 'pctdct',
      link: linkFunc,
      //bindToController: true
    };

    function linkFunc(scope: IProductScope, el: JQuery, attr: any, pctdct: ProductController) {

    }

  }

  /** @ngInject */
  class ProductController {
    private product: IProduct

    constructor(moment: moment.MomentStatic, $location: ng.ILocationService) {

    }
  }
}
