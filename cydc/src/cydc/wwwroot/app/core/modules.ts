namespace Cydc.Core {
    angular.module("Cydc", [
        "Cydc.Directives", 

        "ngRoute",
        "ngMaterial",
        "md.data.table",
        "angularMoment"
    ])
        .service("auth", Service.Auth)
        .service("api", Service.Api)
        .service("menuInfo", Service.MenuInfo)
        .controller("MenuCtrl", Controllers.Widgets.MenuCtrl)
        .config(["$routeProvider", "$locationProvider", ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
            $routeProvider
                .when("/", {
                    templateUrl: '/view/foodOrder/order.html',
                    controller: Controllers.FoodOrder.OrderCtrl,
                    controllerAs: "vm",
                })
                .when("/foodOrder/list", {
                    templateUrl: '/view/foodOrder/list.html',
                    controller: Controllers.FoodOrder.ListCtrl,
                    controllerAs: "vm",
                })
                .when("/about", {
                    templateUrl: "/view/about/about.html",
                    controller: Controllers.About.AboutCtrl,
                    controllerAs: "vm",
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
}