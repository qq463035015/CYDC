define(["require", "exports", 'knockout', 'service/api'], function (require, exports, ko, api) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.list = ko.observableArray();
            this.price = ko.observable();
            api.user.list().then(function (data) { return _this.list(data); });
        }
        viewModel.prototype.addAmount = function () {
        };
        return viewModel;
    })();
    return new viewModel();
});
