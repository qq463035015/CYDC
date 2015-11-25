define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.menu = ko.observableArray();
            window['vm'] = this;
            var params = { page: 1, pageSize: 12, asc: false, orderBy: null };
            $.post('/api/foodMenu/list', params).then(function (data) { _this.menu(data); });
            console.log(this.menu());
        }
        viewModel.prototype.activate = function () {
            return $.when();
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=index.js.map