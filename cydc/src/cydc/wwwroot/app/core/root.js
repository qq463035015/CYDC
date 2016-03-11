var Cydc;
(function (Cydc) {
    var Core;
    (function (Core) {
        var RootCtrl = (function () {
            function RootCtrl($auth, $location, $mdSidenav, $mdDialog, $pageInfo) {
                this.$auth = $auth;
                this.$location = $location;
                this.$mdSidenav = $mdSidenav;
                this.$mdDialog = $mdDialog;
                this.$pageInfo = $pageInfo;
                this.$auth.refreshState();
                window["root"] = this;
            }
            RootCtrl.prototype.pageInfo = function () {
                return this.$pageInfo;
            };
            RootCtrl.prototype.auth = function () {
                return this.$auth;
            };
            RootCtrl.prototype.login = function ($event) {
                return this.$mdDialog.show({
                    controller: Cydc.Account.LoginCtrl,
                    controllerAs: "vm",
                    templateUrl: "/view/account/login.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true
                });
            };
            RootCtrl.prototype.logout = function ($event) {
                var _this = this;
                this.$mdDialog.show(this.$mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title("确定要退出吗？")
                    .ariaLabel("Logout Dialog")
                    .targetEvent($event)
                    .ok("确定")
                    .cancel("取消")).then(function () {
                    return _this.$auth.logout();
                }).then(function () {
                    _this.$mdDialog.show(_this.$mdDialog.alert()
                        .title("退出成功")
                        .targetEvent($event)
                        .ariaLabel("Logout Success")
                        .ok("知道了"));
                });
            };
            RootCtrl.prototype.openMenu = function () {
                this.$mdSidenav("left").toggle();
            };
            RootCtrl.$inject = ["auth", "$location", "$mdSidenav", "$mdDialog", "menuInfo"];
            return RootCtrl;
        }());
        Core.RootCtrl = RootCtrl;
    })(Core = Cydc.Core || (Cydc.Core = {}));
})(Cydc || (Cydc = {}));
