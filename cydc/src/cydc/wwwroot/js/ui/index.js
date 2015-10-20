var Ui;
(function (Ui) {
    var Indexpage = (function () {
        function Indexpage() {
            this.foodPage = ko.observable(1);
        }
        return Indexpage;
    })();
    Ui.Indexpage = Indexpage;
    ko.components.register('food-page', {
        viewModel: function (params) {
            this.pager = params && params.pager;
        },
        template: { fromUrl: '/Views/Home/food.html?now=20151020100314' }
    });
})(Ui || (Ui = {}));
var vm = new Ui.Indexpage();
ko.applyBindings(vm);
