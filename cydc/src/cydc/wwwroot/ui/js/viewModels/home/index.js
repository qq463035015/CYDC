define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var viewModel = (function () {
        function viewModel() {
            this.text = ko.observable();
        }
        viewModel.prototype.activate = function () {
            return $.when();
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=index.js.map