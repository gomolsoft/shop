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
    private $cookieStore: angular.cookies.ICookieStoreService
    private  $http: ng.IHttpProvider

    /** @ngInject */
    constructor(Restangular: restangular.IService, $location: ng.ILocationService, UserLoginService: UserLoginService, $cookieStore: angular.cookies.ICookieStoreService, $http: ng.IHttpProvider) {
      this.restangular = Restangular;
      this.$location = $location;
      this.UserLoginService = UserLoginService;
      this.$cookieStore = $cookieStore
      this.$http = $http


      var refreshSessionId =  () => {
        this.restangular.one('user/sessionId').get().then( (sid: any) => {
            console.log(sid);
            $cookieStore.put("sid", sid.sid)
            this.restangular.setDefaultHeaders({
              'X-Auth-SmartThings': /**'stid=' +*/ sid.sid   ,
              'Content-Type': 'application/json'  ,
              'X-Requested-With': 'XMLHttpRequest'
            });
          }
        )
      }

      //Restangular.setFullResponse(true);
      Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        //if ($cookieStore.get("sid") === undefined)
          //refreshSessionId()

        return response.data;
      });

      /*
      Restangular.setDefaultHttpFields({
        withCredentials: true
      });
      */

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
