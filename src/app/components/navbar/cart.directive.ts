/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  /** @ngInject */
  export function myCart(): ng.IDirective {

    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/cart.html',
      controller: CartController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  /** @ngInject */
  class CartController {
    private locationService: ng.ILocationService;
    private $modal: any
    private modalInstance: any
    private UserLoginService: UserLoginService
    private loginEventUnHandler: Function

    private cart: ICart
    private itemCnt: number

    onCartEvent = (cart:ICart) => {
      if (cart === undefined)
        return

      this.cart = cart
      this.itemCnt = cart.items.length
    }

    constructor(ShoppingCartProvider: ShoppingCartProvider, $rootScope: ng.IRootScopeService, moment: moment.MomentStatic, $location: ng.ILocationService, $modal: any ) {
      this.locationService = $location;
      this.$modal = $modal;

      this.modalInstance=null;
      $rootScope.$on('cart', (event, args) => this.onCartEvent(args.cart));

      this.onCartEvent(ShoppingCartProvider.getCart())

    }
  }
}
