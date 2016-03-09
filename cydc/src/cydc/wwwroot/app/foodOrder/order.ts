namespace Cydc.FoodOrder {
    export class OrderCtrl {
        static $inject = ["$timeout"];
        tasteSelected = 0;
        locationSelected = 0;
       

        updateTasteSelected(selType) {
            if (selType == 1) {
                this.taste0 = false;
                this.taste1 = true;
            } else {
                this.taste0 = true;
                this.taste1 = false;
            }
            this.tasteSelected = selType;
        };

        sel = {
            group1: 'Banana',
            group2: '2',
            menu: '1'
        };

        menu = [{
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


        updateLocation(sel) {
            if (sel == 0) {
                this.location0 = true;
                this.location1 = false;
                this.location2 = false;
            } else if (sel == 1) {
                this.location0 = false;
                this.location1 = true;
                this.location2 = false;
            } else if (sel == 2) {
                this.location0 = false;
                this.location1 = false;
                this.location2 = true;
            }
            this.locationSelected = sel;
        };

        name = "John Doe";
        comment = "";
        taste0 = true;
        taste1 = false;
        location0 = true;
        location1 = false;
        location2 = false;
        taste = ["香辣", "清淡"]
        location = ["辰运", "蜜獾", "易观国际"]
        selMenu = 0;

        visible = false;
        submit  () {
            this.visible = !this.visible;
        }




    }
}