/**
 * Created by sandrobarone on 07.08.15.
 */

module shop {
  'use strict';

  export class IUserLogin {
    username: string
    authenticated: boolean
  }

  export class UserLoginService {
    private userData: IUserLogin;
    private $rootScope: ng.IRootScopeService;


    /** @ngInject */
    constructor ($rootScope: ng.IRootScopeService) {
      this.userData = null;
      this.$rootScope = $rootScope;
    }

    onLoginEvent(userName: string) {
      this.userData = new IUserLogin();
      this.userData.username = userName;
      this.userData.authenticated = true;

      this.$rootScope.$broadcast("loginEvent");
    }

    onLogoutEvent() {
      this.userData = null;

      this.$rootScope.$broadcast("loginEvent");
    }

    isAuthenicated(): boolean {
      if (!(this.userData === undefined || this.userData == null) ){
        return this.userData.authenticated;
      }
      return false;
    }

    userName() {
      if(this.isAuthenicated()) {
        return this.userData.username;
      }
    }
  }

}
