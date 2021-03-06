/// <reference path="../../index.module.ts" />

/**
 * Created by sandrobarone on 28.07.15.
 */
module shop {
    'use strict';

  /** @ngInject */
  export function mysmartthingsLogin(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        extraValues: '='
      },
      templateUrl: 'app/components/user/login.html',
      controller: LoginController,
      controllerAs: 'us',
      bindToController: true
    };

  }

  export class LoginController {
        private $http:ng.IHttpService;
        private $rootScope:ng.IRootScopeService
        private $scope: ng.IScope
        private username: string
        private password: string
        private error: boolean
        private restangular:restangular.IService
        private $location: ng.ILocationService

        private $modalInstance: any

        private UserLoginService: UserLoginService

        /** @ngInject */
        constructor($rootScope: ng.IRootScopeService, $scope: ng.IScope, $http: ng.IHttpService, Restangular:restangular.IService, $location: ng.ILocationService, UserLoginService: UserLoginService, $modalInstance: any) {
            this.$scope = $scope;
            this.$http = $http;
            this.restangular = Restangular;
            this.$location = $location;
            this.$rootScope = $rootScope;

            this.UserLoginService = UserLoginService;

            this.error = false;
            this.$modalInstance = $modalInstance;

            console.log("LoginController");
        }

        cancel = () => {
          this.$modalInstance.dismiss('cancel');
          this.error = false;
          this.UserLoginService.onLogoutEvent();

        }

        onLoginOk = (username: string) => {
          this.$modalInstance.close("loggedin");
          this.error = false;
          this.UserLoginService.onLoginEvent(username);
        }

        onLoginError = () => {
          this.error = true;
          this.UserLoginService.onLogoutEvent();
          this.$rootScope.$broadcast("loginEvent");

          console.log("onLoginError");
        }

        login() {
          this.UserLoginService.login(this.onLoginOk, this.onLoginError, this.username, this.password);

        }
    }

}
