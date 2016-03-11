var Cydc;
(function (Cydc) {
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
    })(FoodOrder = Cydc.FoodOrder || (Cydc.FoodOrder = {}));
})(Cydc || (Cydc = {}));
