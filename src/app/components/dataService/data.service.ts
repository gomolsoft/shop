module shop {
  'use strict';

  export interface IComment {
    comment: string
  }

  export interface IProduct {
    id: string
    productId: string
    name: string
    discount: number
    comments?: IComment[]
  }

  export class DataProvider {
    private restangular:restangular.IService
    private $location: ng.ILocationService
    private UserLoginService: UserLoginService


    /** @ngInject */
    constructor(Restangular: restangular.IService, $location: ng.ILocationService, UserLoginService: UserLoginService) {
      this.restangular = Restangular;
      this.$location = $location;
      this.UserLoginService = UserLoginService;

      Restangular.setErrorInterceptor(
        function(response) {
          if (response.status == 401) {
            console.log("Login required... ");
            //$window.location.href='/login';
          } else if (response.status == 404) {
            console.log("Resource not available...");
          } else {
            console.log("Response received with HTTP error code: " + response.status );
          }
          return false; // stop the promise chain
        }
      );

    }

    devices (devicesCB:(products:IProduct[]) => void): void {
      this.restangular.all('product').get('products').then( (data: IProduct[]) => {
        devicesCB(data)
      });
    }

    product (productCB:(product:IProduct) => void, id: string): void {
      this.restangular.one('product').post(id).then( (product: IProduct) => {
          productCB(product)
      });
    }

  }
}
