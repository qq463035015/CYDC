namespace Cydc.Core {
    export class RootCtrl {
        static $inject = ["auth", "$location", "$mdSidenav", "$mdDialog"];
        constructor(
            private auth: Service.Auth,
            private $location: ng.ILocationService,
            private $mdSidenav: ng.material.ISidenavService,
            private $mdDialog: ng.material.IDialogService
        ) {
            this.auth.refreshState();
            window["root"] = this;
        }

        authState() {
            return this.auth;
        }

        login($event) {
            return this.$mdDialog.show({
                controller: Cydc.Account.LoginCtrl,
                controllerAs: "vm",
                templateUrl: "/view/account/login.html",
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }

        logout($event) {
            this.$mdDialog.show(this.$mdDialog.confirm()
                .parent(angular.element(document.body))
                .clickOutsideToClose(true)
                .title("确定要退出吗？")
                .ariaLabel("Logout Dialog")
                .targetEvent($event)
                .ok("确定")
                .cancel("取消")
            ).then(() => {
                return this.auth.logout();
            }).then(() => {
                this.$mdDialog.show(this.$mdDialog.alert()
                    .title("退出成功")
                    .targetEvent($event)
                    .ariaLabel("Logout Success")
                    .ok("知道了"));
            });
        }

        openMenu() {
            this.$mdSidenav("left").toggle();
        }
    }
}