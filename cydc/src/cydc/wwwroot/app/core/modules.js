var Cydc;
(function (Cydc) {
    var Core;
    (function (Core) {
        angular.module("Cydc", ["ngRoute", "ngMaterial"])
            .service("auth", Cydc.Service.Auth)
            .service("api", Cydc.Service.Api)
            .service("menuInfo", Cydc.Service.MenuInfo)
            .controller("MenuCtrl", Cydc.Controllers.Widgets.MenuCtrl)
            .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/", {
                    templateUrl: '/view/foodOrder/order.html',
                    controller: Cydc.Controllers.FoodOrder.OrderCtrl,
                    controllerAs: "vm",
                })
                    .when("/foodOrder/list", {
                    templateUrl: '/view/foodOrder/orderList.html',
                    controller: Cydc.Controllers.FoodOrder.OrderListCtrl,
                    controllerAs: "vm",
                })
                    .when("/about", {
                    templateUrl: "/view/about/about.html",
                    controller: Cydc.Controllers.About.AboutCtrl,
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
            .controller("RootCtrl", Core.RootCtrl);
    })(Core = Cydc.Core || (Cydc.Core = {}));
})(Cydc || (Cydc = {}));
