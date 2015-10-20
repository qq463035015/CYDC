module Ui {
    export class Indexpage {
        foodPage = ko.observable(1);
    }
    ko.components.register('food-page', {
        viewModel: function (params) {
            this.pager = params && params.pager;
        },
        template: { fromUrl: '/Views/Home/food.html?now=20151020100314' }
    });
}
var vm = new Ui.Indexpage();
ko.applyBindings(vm)

