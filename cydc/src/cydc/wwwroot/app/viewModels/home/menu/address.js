define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.location = ko.observableArray();
            var params = { page: 1, pageSize: 12, asc: false, orderBy: null };
            $.post('/api/location/list', params).then(function (data) { _this.location(data); console.log(data); });
            console.log(this.location());
        }
        viewModel.prototype.activate = function () {
            return $.when();
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=address.js.map