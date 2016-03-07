class RootCtrl {
    static $inject = ["auth", "$location", "$mdSidenav", "$mdDialog"];
    constructor(
        private auth: Cydc.Auth,
        private $location: ng.ILocationService,
        private $mdSidenav: ng.material.ISidenavService,
        private $mdDialog: ng.material.IDialogService
    ) {
        this.auth.refreshState();
        window["root"] = this;
    }

    authed() {
        return this.auth.authed;
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