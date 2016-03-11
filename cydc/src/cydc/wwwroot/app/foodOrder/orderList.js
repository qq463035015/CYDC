var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var OrderListCtrl = (function () {
                function OrderListCtrl(pageInfo) {
                    this.pageInfo = pageInfo;
                    pageInfo.setId("foodOrderList");
                }
                OrderListCtrl.$inject = ["menuInfo"];
                return OrderListCtrl;
            }());
            FoodOrder.OrderListCtrl = OrderListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
