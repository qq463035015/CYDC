namespace Cydc.FoodOrder {
    export class OrderListCtrl {
        constructor(
            private auth: Cydc.Auth,
            private $location: ng.ILocationService,
            private $mdSidenav: ng.material.ISidenavService,
            private $mdDialog: ng.material.IDialogService
        ) {
        }
    }

}