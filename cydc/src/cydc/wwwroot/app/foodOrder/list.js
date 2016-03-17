var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var ListCtrl = (function () {
                function ListCtrl($scope, $mdSidenav, $log, pageInfo, $http, api) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$mdSidenav = $mdSidenav;
                    this.$log = $log;
                    this.pageInfo = pageInfo;
                    this.$http = $http;
                    this.api = api;
                    this.query = {
                        page: 1,
                        pageSize: 15,
                        userName: "",
                        date: null
                    };
                    this.onPaginate = function () {
                        _this.loadData();
                    };
                    pageInfo.setId("foodOrderList");
                    this.loadData();
                    $scope.$watch(function () { return _this.query.userName; }, function (prev, current) {
                        if (prev !== current) {
                            _this.loadData();
                        }
                    });
                }
                ListCtrl.prototype.showAdvanceQuery = function () {
                    var _this = this;
                    this.$mdSidenav("right")
                        .toggle()
                        .then(function () {
                        _this.$log.debug("toggle right is done");
                    });
                };
                ListCtrl.prototype.advanceQuery = function () {
                    this.loadData();
                };
                ListCtrl.prototype.removeQuery = function () {
                    this.query.userName = "";
                };
                ListCtrl.prototype.loadData = function () {
                    var _this = this;
                    var promise = this.api.order.list(this.query);
                    this.promise = promise;
                    promise.then(function (r) {
                        _this.data = r.data;
                    });
                };
                ListCtrl.$inject = ["$scope", "$mdSidenav", "$log", "menuInfo", "$http", "api"];
                return ListCtrl;
            }());
            FoodOrder.ListCtrl = ListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
