class RootCtrl {
    static $inject = ["auth", "$location", "$mdSidenav"];
    constructor(
        public auth: Cydc.Auth,
        public location: ng.ILocationService,
        public mdSidenav: ng.material.ISidenavService
    ) {
        this.checkLogin();
    }

    checkLogin() {
        if (this.location.path() !== "/account/login") {
            this.auth.checkLogin().catch(() => {
                this.location.path("/account/login");
            });
        }
    }

    openMenu() {
        this.mdSidenav("left").toggle();
    }
}

angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .service("auth", Cydc.Auth)
    .service("api", Cydc.Api)
    .config(["$routeProvider", "$locationProvider", ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
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