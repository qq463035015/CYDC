var RootCtrl = (function () {
    function RootCtrl(auth, $location, $mdSidenav, $mdDialog) {
        this.auth = auth;
        this.$location = $location;
        this.$mdSidenav = $mdSidenav;
        this.$mdDialog = $mdDialog;
        this.auth.refreshState();
        window["root"] = this;
    }
    RootCtrl.prototype.authed = function () {
        return this.auth.authed;
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
            return _this.auth.logout();
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
    RootCtrl.$inject = ["auth", "$location", "$mdSidenav", "$mdDialog"];
    return RootCtrl;
}());
angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .service("auth", Cydc.Auth)
    .service("api", Cydc.Api)
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
            templateUrl: '/view/foodOrder/order.html',
            controller: Cydc.FoodOrder.OrderCtrl,
            controllerAs: 'vm'
        })
            .when("/foodOrder/order", {
            templateUrl: '/view/foodOrder/order.html',
            controller: Cydc.FoodOrder.OrderCtrl,
            controllerAs: 'vm'
        })
            .when("/about", {
            templateUrl: "/view/about/about.html"
        })
            .otherwise({
            templateUrl: "/view/errors/404.html"
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller("RootCtrl", RootCtrl);
