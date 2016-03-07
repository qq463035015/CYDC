namespace Cydc.Account {
    export class LoginCtrl {
        static $inject = ["auth", "$mdToast", "$location", "$mdDialog"];
        constructor(
            private auth: Auth,
            private $mdToast: ng.material.IToastService,
            private $location: ng.ILocationService,
            private $mdDialog: ng.material.IDialogService) {
        }

        userName: string;
        password: string;
        rememberMe = true;

        requesting = false;

        login() {
            this.requesting = true;
            this.auth.login(this.userName, this.password, this.rememberMe).then(() => {
                this.$mdDialog.hide();
            }).catch((r) => {
                this.$mdToast.showSimple("用户名或密码不正确。");
            }).finally(() => {
                this.requesting = false;
            });
        }

        cancel() {
            this.$mdDialog.cancel();
        }
    }
}