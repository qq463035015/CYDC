module Cydc.Controllers.Widgets {
    export class MenuCtrl {
        static $inject = ["$scope", "menuInfo", "auth"];
        constructor(
            private $scope: ng.IScope, 
            private pageInfo: Service.MenuInfo,
            private auth: Service.Auth) {
            window["menu"] = this;

            console.log("FUCK");
        }

        menus() {
            return this.auth.isAdmin ?
                this.pageInfo.userMenus() :
                this.pageInfo.adminMenus();
        }

        currentId() {
            return this.pageInfo.currentPage.id;
        }
    }
};