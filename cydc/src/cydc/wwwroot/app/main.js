var MainCtrl = (function () {
    function MainCtrl() {
    }
    return MainCtrl;
}());
angular.module("Cydc", ["ngRoute", "ngMaterial"])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        console.log($routeProvider, $locationProvider);
        $routeProvider
            .when('/', {
            templateUrl: '/view/index.html',
            controller: 'IndexCtrl',
            controllerAs: 'vm'
        })
            .when('/login', {
            templateUrl: 'chapter.html',
            controller: 'ChapterCtrl',
            controllerAs: 'vm'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller("Main", MainCtrl)
    .controller("IndexCtrl", function () {
});
