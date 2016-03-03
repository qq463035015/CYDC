class MainCtrl {

}


angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .config(["$routeProvider", "$locationProvider", ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        console.log($routeProvider, $locationProvider);
        $routeProvider
            .when('/', {
                templateUrl: '/view/index.html',
                controller: 'IndexCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/view/',
                controller: 'ChapterCtrl',
                controllerAs: 'vm'
            });
        $locationProvider.html5Mode({
            enabled: true, 
            requireBase: false
        });
    }])
    .controller("Main", MainCtrl)
    .controller("IndexCtrl", () => {
    });