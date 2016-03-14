namespace Cydc.Controllers.FoodOrder {
    export class ListCtrl {
        static $inject = ["menuInfo", "$http", "api"];
        constructor(
            private pageInfo: Service.MenuInfo, 
            private $http: ng.IHttpService, 
            private api: Service.Api
        ) {
            pageInfo.setId("foodOrderList");

            this.getData();
        }

        data: Service.IPagedData<any>;
        promise: ng.IHttpPromise<Service.IPagedData<any>>;

        getData() {
            let promise = this.api.order.list();
            this.promise = promise;
            promise.then(r => {
                this.data = r.data;
            });
        }
    }
}