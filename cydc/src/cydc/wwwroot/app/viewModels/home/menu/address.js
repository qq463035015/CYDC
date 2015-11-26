define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allLocation = ko.observableArray();
            this.name = ko.observable();
            api.location.list().then(function (data) { return _this.allLocation(data); });
        }
        viewModel.prototype.drop = function (data) {
            utils.confirm('', '确定要删除吗？').then(function () {
                return api.location.delete(data.id);
            });
        };
        viewModel.prototype.add = function () {
            api.location.install(this.name()).then(function () { location.reload(); });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=address.js.map