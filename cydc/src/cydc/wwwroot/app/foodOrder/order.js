var Cydc;
(function (Cydc) {
    var FoodOrder;
    (function (FoodOrder) {
        var OrderCtrl = (function () {
            function OrderCtrl() {
                this.tasteSelected = 0;
                this.locationSelected = 0;
                this.sel = {
                    group1: 'Banana',
                    taste: '0',
                    menu: '1'
                };
                this.menu = [{
                        id: "1",
                        price: '12',
                        title: '红萝卜炒肉、腊鱼、腐竹、包菜',
                        value: '1'
                    }, {
                        id: "2",
                        price: '15',
                        title: '土豆红烧肉、大祘炒蛋、小菜、下饭菜',
                        value: '2'
                    }];
                this.taste = [{ name: "香辣", value: '0' }, { name: "清淡", value: '1' }];
                this.name = "John Doe";
                this.comment = "";
                this.taste0 = true;
                this.taste1 = false;
                this.location0 = true;
                this.location1 = false;
                this.location2 = false;
                this.location = ["辰运", "蜜獾", "易观国际"];
                this.selMenu = 0;
                this.visible = false;
            }
            OrderCtrl.prototype.updateTasteSelected = function (selType) {
                if (selType == 1) {
                    this.taste0 = false;
                    this.taste1 = true;
                }
                else {
                    this.taste0 = true;
                    this.taste1 = false;
                }
                this.tasteSelected = selType;
            };
            ;
            OrderCtrl.prototype.updateLocation = function (sel) {
                if (sel == 0) {
                    this.location0 = true;
                    this.location1 = false;
                    this.location2 = false;
                }
                else if (sel == 1) {
                    this.location0 = false;
                    this.location1 = true;
                    this.location2 = false;
                }
                else if (sel == 2) {
                    this.location0 = false;
                    this.location1 = false;
                    this.location2 = true;
                }
                this.locationSelected = sel;
            };
            ;
            OrderCtrl.prototype.submit = function () {
                this.visible = !this.visible;
            };
            OrderCtrl.$inject = ["$timeout"];
            return OrderCtrl;
        }());
        FoodOrder.OrderCtrl = OrderCtrl;
    })(FoodOrder = Cydc.FoodOrder || (Cydc.FoodOrder = {}));
})(Cydc || (Cydc = {}));
