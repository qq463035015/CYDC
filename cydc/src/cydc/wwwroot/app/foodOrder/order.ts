namespace Cydc.FoodOrder {
    export class OrderCtrl {

  constructor(
        private auth: Cydc.Auth,
        private $location: ng.ILocationService,
        private $mdSidenav: ng.material.ISidenavService,
        private $mdDialog: ng.material.IDialogService
    ) {
        this.auth.refreshState();
        window["root"] = this;
    }

    authState() {
        return this.auth;
    }

    Sure($event) {
        this.confirmOrder = "套餐：" + this.menu[this.sel.menu].title;

        this.$mdDialog.show(this.$mdDialog.confirm()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title("确认订单信息")
            .textContent(this.confirmOrder)
            .ariaLabel("Logout Dialog")
            .targetEvent($event)
            .ok("确定")
            .cancel("取消")
        ).then(() => {
            return this.auth.logout();
        }).then(() => {
            this.$mdDialog.show(this.$mdDialog.alert()
                .title("退出成功")
                .targetEvent($event)
                .ariaLabel("Logout Success")
                .ok("知道了"));
        });
    }

       

        sel = {location: '0',taste: '0', menu: '0'};

        menu = [
            { price: '12', title: '红萝卜炒肉、腊鱼、腐竹、包菜', value: '0' },
            { price: '15', title: '土豆红烧肉、大祘炒蛋、小菜、下饭菜', value: '1' }
        ];

       taste = [
            { name: "香辣", value: '0' },
            { name: "清淡", value: '1' }
        ];

        location = [
            { name: "辰运", value: '0' },
            { name: "蜜獾", value: '1' },
            { name: "易观国际", value: '2' }
        ];

        confirmOrder = "";
        comment = "";
        visible = false;

      

       
    }

}