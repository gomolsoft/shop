/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  /** @ngInject */
  export function acmeNavbar(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        creationDate: '='
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

  }

  /** @ngInject */
  class NavbarController {
    private locationService: ng.ILocationService;
    private $modal: any
    private modalInstance: any
    private UserLoginService: UserLoginService
    private loginEventUnHandler: Function

    constructor($rootScope: ng.IRootScopeService, moment: moment.MomentStatic, $location: ng.ILocationService, $modal: any, UserLoginService: UserLoginService) {
      this.locationService = $location;
      this.$modal = $modal;
      this.UserLoginService = UserLoginService

      this.modalInstance=null;

      var loginEventHandler = ( event ) =>  {
        console.log("event" + event);
        if (this.UserLoginService.isAuthenicated()) {
          //this.username = this.UserLoginService.userName();
        }
        //this.isAuthenticated = this.UserLoginService.isAuthenicated();
      }

      this.loginEventUnHandler = $rootScope.$on( "loginEvent", loginEventHandler );

    }

    isLoggedIn(): boolean {
      return this.UserLoginService.isAuthenicated();
    }

    isActive(viewLocation: string): boolean {
      return viewLocation === this.locationService.path();
    }

    onLogin() {
      this.modalInstance = this.$modal.open({
        animation: true,
        templateUrl: 'app/components/user/login.html',
        controller: 'LoginController',
        controllerAs: 'us',
        size: 'sm',
      });
    }
  }
}
