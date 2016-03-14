var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var ListCtrl = (function () {
                function ListCtrl(pageInfo, $http, api) {
                    this.pageInfo = pageInfo;
                    this.$http = $http;
                    this.api = api;
                    pageInfo.setId("foodOrderList");
                    this.getData();
                }
                ListCtrl.prototype.getData = function () {
                    var _this = this;
                    var promise = this.api.order.list();
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
