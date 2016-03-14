namespace Cydc.Controllers.FoodOrder {
    export class ListCtrl {
        static $inject = ["menuInfo", "$http", "api"];
        constructor(
            private pageInfo: Service.MenuInfo, 
            private $http: ng.IHttpService, 
            private api: Service.Api
        ) {
            pageInfo.setId("foodOrderList");

            this.loadData();
        }

        query: Service.IPagedQuery = {
            page: 1, 
            pageSize: 15
        };
        data: Service.IPagedData<any>;
        promise: ng.IHttpPromise<Service.IPagedData<any>>;

        loadData() {
            let promise = this.api.order.list(this.query);
            this.promise = promise;
            promise.then(r => {
                this.data = r.data;
            });
        }

        onPaginate = () => {
            this.loadData();
        }
    }
}