var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var OrderListCtrl = (function () {
                function OrderListCtrl(auth, $location, $mdSidenav, $mdDialog) {
                    this.auth = auth;
                    this.$location = $location;
                    this.$mdSidenav = $mdSidenav;
                    this.$mdDialog = $mdDialog;
                }
                return OrderListCtrl;
            }());
            FoodOrder.OrderListCtrl = OrderListCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
