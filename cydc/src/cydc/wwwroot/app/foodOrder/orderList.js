var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var OrderListCtrl = (function () {
                function OrderListCtrl(pageInfo) {
                    this.pageInfo = pageInfo;
                    pageInfo.title = "点餐列表";
                }
                OrderListCtrl.$inject = ["pageInfo"];
                return OrderListCtrl;
            }());
            FoodOrder.OrderListCtrl = OrderListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
