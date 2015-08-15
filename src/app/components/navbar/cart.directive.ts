/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  /** @ngInject */
  export function myCart(): ng.IDirective {

    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/cart.html',
      controller: CartController,
      controllerAs: 'cart',
      bindToController: true
    };
  }

  /** @ngInject */
  class CartController {

    private cart: ICart
    private itemCnt: number

    onCartEvent = (cart:ICart) => {
      if (cart === undefined)
        return

      this.cart = cart
      this.itemCnt = cart.items.length
    }

    constructor(ShoppingCartProvider: ShoppingCartProvider, $rootScope: ng.IRootScopeService ) {
      $rootScope.$on('cart', (event, args) => this.onCartEvent(args.cart));
      this.onCartEvent(ShoppingCartProvider.getCart())
    }
  }
}
