var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var ListCtrl = (function () {
                function ListCtrl(pageInfo) {
                    this.pageInfo = pageInfo;
                    pageInfo.setId("foodOrderList");
                }
                ListCtrl.$inject = ["menuInfo"];
                return ListCtrl;
            }());
            FoodOrder.ListCtrl = ListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
