var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var FoodOrder;
        (function (FoodOrder) {
            var OrderCtrl = (function () {
                function OrderCtrl(auth, $location, $mdSidenav, $mdDialog, menuInfo) {
                    this.auth = auth;
                    this.$location = $location;
                    this.$mdSidenav = $mdSidenav;
                    this.$mdDialog = $mdDialog;
                    this.menuInfo = menuInfo;
                    this.sel = { location: '0', taste: '0', menu: '0' };
                    this.menu = [
                        { price: '12', title: '红萝卜炒肉、腊鱼、腐竹、包菜', value: '0' },
                        { price: '15', title: '土豆红烧肉、大祘炒蛋、小菜、下饭菜', value: '1' }
                    ];
                    this.taste = [
                        { name: "香辣", value: '0' },
                        { name: "清淡", value: '1' }
                    ];
                    this.location = [
                        { name: "辰运", value: '0' },
                        { name: "蜜獾", value: '1' },
                        { name: "易观国际", value: '2' }
                    ];
                    this.confirmOrder = "";
                    this.comment = "";
                    this.visible = false;
                    menuInfo.setId("foodOrder");
                    window["order"] = this;
                }
                OrderCtrl.prototype.Sure = function ($event) {
                    var _this = this;
                    this.confirmOrder = "套餐：" + this.menu[this.sel.menu].title;
                    this.$mdDialog.show(this.$mdDialog.confirm()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        .title("确认订单信息")
                        .textContent(this.confirmOrder)
                        .ariaLabel("Logout Dialog")
                        .targetEvent($event)
                        .ok("确定")
                        .cancel("取消")).then(function () {
                        return _this.auth.logout();
                    }).then(function () {
                        _this.$mdDialog.show(_this.$mdDialog.alert()
                            .title("退出成功")
                            .targetEvent($event)
                            .ariaLabel("Logout Success")
                            .ok("知道了"));
                    });
                };
                OrderCtrl.$inject = ["auth", "$location", "$mdSidenav", "$mdDialog", "menuInfo"];
                return OrderCtrl;
            }());
            FoodOrder.OrderCtrl = OrderCtrl;
        })(FoodOrder = Controllers.FoodOrder || (Controllers.FoodOrder = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
