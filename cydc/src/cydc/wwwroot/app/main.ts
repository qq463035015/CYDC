class RootCtrl {
    static $inject = ["auth", "$location"];
    constructor(public auth: Cydc.Auth, public $location: ng.ILocationService) {
        this.checkLogin();
    }

    checkLogin() {
        console.log(this.$location.path());
        if (this.$location.path() != "/account/login") {
            this.auth.checkLogin().catch(() => {
                this.$location.path("/account/login");
            });
        }
    }
}

angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .service("auth", Cydc.Auth)
    .service("api", Cydc.Api)
    .config(["$routeProvider", "$locationProvider", ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: '/view/foodOrder/order.html',
                controller: () => { },
                controllerAs: 'vm'
            })
            .when("/foodOrder/order", {
                templateUrl: '/view/foodOrder/order.html',
                controller: () => { },
                controllerAs: 'vm'
            })
            .when('/account/login', {
                templateUrl: '/view/account/login.html',
                controller: () => { },
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