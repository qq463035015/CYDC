namespace Cydc.Controllers.FoodOrder {
    export class ListCtrl {
        static $inject = ["menuInfo"];
        constructor(
            private pageInfo: Service.MenuInfo
        ) {
            pageInfo.setId("foodOrderList");
        }
    }
}