/**
 * Created by sandrobarone on 07.08.15.
 */

module shop {
  'use strict';

  export class IUserLogin {
    username: string
    xtoken: string

    authenticated: boolean
  }

  export class UserLoginService {
    private userData: IUserLogin;
    private $rootScope: ng.IRootScopeService;
    private restangular:restangular.IService;

    demoLogin = (userName: string) => {
      console.log('UnAuthoUser:>'+userName);
    }

    demoLoginFail = () => {
      console.log('UnAuthoUser Failed!');
    }

    /** @ngInject */
    constructor ($rootScope: ng.IRootScopeService, Restangular:restangular.IService) {
      //this.userData = new IUserLogin();
      this.$rootScope = $rootScope;
      this.restangular = Restangular;

      this.login(this.demoLogin, this.demoLoginFail, "WebUser","$")
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

    public login(loginOkCB:(username:string)=>void, loginFail:()=>void, user:string, pwd: string) {

      this.restangular.setDefaultHeaders({
        'X-Auth-Username': user,
        'X-Auth-Password': pwd,
        'X-Auth-Token'   : (this.userData !== undefined) ? this.userData.xtoken : 'X',

        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });

      this.restangular.one('').post('authenticate').then( (data: any) => {
          this.userData = new IUserLogin()

          this.userData.username = user
          this.userData.xtoken = data.token

          this.restangular.setDefaultHeaders({
            'X-Auth-Token': this.userData.xtoken,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          });

          loginOkCB(user)

          return true;
        },
        () => {
          var onLoginError = () => {
            console.error("Authorization Fails. Username ond/or Password are wrong.");
          }
          loginFail();

          return false;
        }
      );
    }


  }

}
