/**
 * Created by sandrobarone on 11.08.15.
 */
module shop {
  'use strict';

  export interface ICartItem {
    product: IProduct
    quantity: number
  }

  export interface ICart {
    items: ICartItem[]

    total: number
  }

  export class ShoppingCartProvider {
    private restangular:restangular.IService
    private UserLoginService: UserLoginService
    private $rootScope: ng.IRootScopeService
    private cart: ICart

    /** @ngInject */
    constructor($rootScope: ng.IRootScopeService, Restangular: restangular.IService, UserLoginService: UserLoginService) {
      this.restangular = Restangular;
      this.UserLoginService = UserLoginService;
      this.$rootScope = $rootScope;
    }

    updateCart = (cart:ICart) => {
      this.cart = cart
    }

    getCart():ICart {
      return this.cart
    }

    addToShoppingCart (updateShoppingCartCB:(cart:ICart) => void, id: string, quty:number): void {
      var cart = 'productId='+ id + '&' + 'quantity=' + quty
      ;

      this.restangular.one('product').customPOST(
        cart,
        'cart',
        undefined, // params here, e.g. {format: "json"}
        {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}
      ).then( (cart: ICart) => {
            updateShoppingCartCB(cart)
            this.updateCart(cart)

            this.$rootScope.$broadcast('cart', { cart });
          }
      )

    }

  }
}
