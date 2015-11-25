define(["require", "exports", 'service/business'], function (require, exports, business) {
    var viewModel = (function () {
        function viewModel() {
            this.location = ko.observableArray();
        }
        viewModel.prototype.activate = function () {
            business.location.list().then(function (data) {
                console.log(data);
            });
            return $.Deferred().resolve();
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=address.js.map