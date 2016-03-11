﻿namespace Cydc.Controllers.FoodOrder {
    export class OrderListCtrl {
        static $inject = ["pageInfo"];
        constructor(
            private pageInfo: Service.PageInfo
        ) {
            pageInfo.title = "点餐列表";
        }
    }
}