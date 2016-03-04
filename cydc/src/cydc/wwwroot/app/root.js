var RootCtrl = (function () {
    function RootCtrl(auth, location, mdSidenav) {
        this.auth = auth;
        this.location = location;
        this.mdSidenav = mdSidenav;
        this.checkLogin();
    }
    RootCtrl.prototype.checkLogin = function () {
        var _this = this;
        if (this.location.path() !== "/account/login") {
            this.auth.checkLogin().catch(function () {
                _this.location.path("/account/login");
            });
        }
    };
    RootCtrl.prototype.openMenu = function () {
        this.mdSidenav("left").toggle();
    };
    RootCtrl.$inject = ["auth", "$location", "$mdSidenav"];
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
            .when('/account/login', {
            templateUrl: '/view/account/login.html',
            controller: Cydc.Account.LoginCtrl,
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
