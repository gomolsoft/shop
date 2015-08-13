/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  interface IProductScope extends ng.IScope {
    product: IProduct;
  }

  /** @ngInject */
  export function productDetails(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        product: '='
      },
      templateUrl: 'app/components/product/product.details.directive.html',
      controller: ProductDirectiveDetailsController,
      controllerAs: 'pctddtct',
      link: linkFunc,
      //bindToController: true
    };

    function linkFunc(scope: IProductScope, el: JQuery, attr: any, pctddtct: ProductDirectiveDetailsController) {

    }

  }

  /** @ngInject */
  class ProductDirectiveDetailsController {
    private shopping_quantity: number
    private shoppingCartProvider: ShoppingCartProvider
    private cart : ICart

    constructor(moment: moment.MomentStatic, $location: ng.ILocationService, ShoppingCartProvider: ShoppingCartProvider) {
      this.shopping_quantity=1;
      this.shoppingCartProvider = ShoppingCartProvider;
    }

    isOffer(product: IProduct) {
      if (product === undefined)
        return false;

      return product.discount > 0;
    }

    addToCart(product: IProduct) {
      this.shoppingCartProvider.addToShoppingCart((cart) => this.cart = cart, product.productId, this.shopping_quantity)
    }
  }
}
