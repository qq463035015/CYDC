﻿namespace Cydc.Core {
    angular.module("Cydc", ["ngRoute", "ngMaterial"])
        .service("auth", Service.Auth)
        .service("api", Service.Api)
        .value("pageInfo", new Service.PageInfo)
        .config(["$routeProvider", "$locationProvider", ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
            $routeProvider
                .when("/", {
                    templateUrl: '/view/foodOrder/order.html',
                    controller: Controllers.FoodOrder.OrderCtrl,
                    controllerAs: "vm", 
                })
                .when("/foodOrder/list", {
                    templateUrl: '/view/foodOrder/orderList.html',
                    controller: Controllers.FoodOrder.OrderListCtrl,
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