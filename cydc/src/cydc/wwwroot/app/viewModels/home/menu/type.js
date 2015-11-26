define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allType = ko.observableArray();
            this.name = ko.observable();
            api.type.list().then(function (data) { return _this.allType(data); });
        }
        viewModel.prototype.add = function () {
            api.type.install(this.name()).then(function () { location.reload(); });
        };
        viewModel.prototype.drop = function (data) {
            utils.confirm('', '你确定要删除吗？').then(function () {
                return api.type.delete(data.id);
            });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=type.js.map