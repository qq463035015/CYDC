var RootCtrl = (function () {
    function RootCtrl() {
    }
    return RootCtrl;
}());
angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .service("auth", Cydc.Auth)
    .service("api", Cydc.Api)
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
            templateUrl: '/view/index.html',
            controller: 'IndexCtrl',
            controllerAs: 'vm'
        })
            .when('/login', {
            templateUrl: '/view/',
            controller: 'ChapterCtrl',
            controllerAs: 'vm'
        })
            .otherwise({
            templateUrl: "/view/404.html"
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller("RootCtrl", RootCtrl)
    .controller("IndexCtrl", function () {
});
