namespace Cydc.Controllers.FoodOrder {
    export class ListCtrl {
        static $inject = ["$scope", "$mdSidenav", "$log", "menuInfo", "$http", "api"];
        constructor(
            private $scope: ng.IScope,
            private $mdSidenav: ng.material.ISidenavService, 
            private $log: ng.ILogService, 
            private pageInfo: Service.MenuInfo, 
            private $http: ng.IHttpService, 
            private api: Service.Api
        ) {
            pageInfo.setId("foodOrderList");
            this.loadData();

            $scope.$watch(() => this.query.userName, (prev, current) => {
                if (prev !== current) {
                    this.loadData();
                }
            });
        }

        query: IFoodOrderQuery = {
            page: 1, 
            pageSize: 15, 
            userName: "", 
            date: null
        };

        data: Service.IPagedData<any>;
        promise: ng.IHttpPromise<Service.IPagedData<any>>;

        showAdvanceQuery() {
            this.$mdSidenav("right")
                .toggle()
                .then(() => {
                    this.$log.debug("toggle right is done");
                });
        }

        advanceQuery() {
            this.loadData();
        }

        removeQuery() {
            this.query.userName = "";
        }

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

    interface IFoodOrderQuery extends Service.IPagedQuery {
        userName: string;
        date: Date;
    }
}