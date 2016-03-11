namespace Cydc.Controllers.FoodOrder {
    export class OrderListCtrl {
        constructor(
            private auth: Service.Auth,
            private $location: ng.ILocationService,
            private $mdSidenav: ng.material.ISidenavService,
            private $mdDialog: ng.material.IDialogService
        ) {
        }
    }

}