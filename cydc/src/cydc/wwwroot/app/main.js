var RootCtrl = (function () {
    function RootCtrl(auth, $location) {
        this.auth = auth;
        this.$location = $location;
        this.checkLogin();
    }
    RootCtrl.prototype.checkLogin = function () {
        var _this = this;
        console.log(this.$location.path());
        if (this.$location.path() != "/account/login") {
            this.auth.checkLogin().catch(function () {
                _this.$location.path("/account/login");
            });
        }
    };
    RootCtrl.$inject = ["auth", "$location"];
    return RootCtrl;
}());
angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .service("auth", Cydc.Auth)
    .service("api", Cydc.Api)
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
            templateUrl: '/view/foodOrder/order.html',
            controller: function () { },
            controllerAs: 'vm'
        })
            .when("/foodOrder/order", {
            templateUrl: '/view/foodOrder/order.html',
            controller: function () { },
            controllerAs: 'vm'
        })
            .when('/account/login', {
            templateUrl: '/view/account/login.html',
            controller: function () { },
            controllerAs: 'vm'
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
