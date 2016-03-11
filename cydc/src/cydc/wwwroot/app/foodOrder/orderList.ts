namespace Cydc.Controllers.FoodOrder {
    export class OrderListCtrl {
        static $inject = ["menuInfo"];
        constructor(
            private pageInfo: Service.MenuInfo
        ) {
            pageInfo.setId("foodOrderList");
        }
    }
}