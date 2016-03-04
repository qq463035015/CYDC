namespace Cydc.Account {
    export class LoginCtrl {
        static $inject = ["auth", "$mdToast", "$location"];
        constructor(public auth: Auth, public mdToast: ng.material.IToastService, public location: ng.ILocationService) {
        }

        userName: string;
        password: string;
        rememberMe = true;

        requesting = false;

        login() {
            this.requesting = true;
            this.auth.login(this.userName, this.password, this.rememberMe).then(() => {
                this.location.path("/");
            }).catch((r) => {
                this.mdToast.showSimple("Username or password not correct.");
            }).finally(() => {
                this.requesting = false;
            });
        }
    }
}