var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var ListCtrl = (function () {
                function ListCtrl(pageInfo, $http, api) {
                    var _this = this;
                    this.pageInfo = pageInfo;
                    this.$http = $http;
                    this.api = api;
                    this.query = {
                        page: 1,
                        pageSize: 15
                    };
                    this.onPaginate = function () {
                        _this.loadData();
                    };
                    pageInfo.setId("foodOrderList");
                    this.loadData();
                }
                ListCtrl.prototype.loadData = function () {
                    var _this = this;
                    var promise = this.api.order.list(this.query);
                    this.promise = promise;
                    promise.then(function (r) {
                        _this.data = r.data;
                    });
                };
                ListCtrl.$inject = ["menuInfo", "$http", "api"];
                return ListCtrl;
            }());
            FoodOrder.ListCtrl = ListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
