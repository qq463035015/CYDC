define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allMenu = ko.observableArray();
            this.details = ko.observable();
            this.title = ko.observable();
            this.price = ko.observable();
            api.menu.list().then(function (data) { return _this.allMenu(data); });
        }
        viewModel.prototype.add = function () {
            api.menu.create(this.details(), this.title(), this.price()).then(function () { location.reload(); });
        };
        viewModel.prototype.drop = function (data) {
            utils.confirm('', '确定要删除吗？').then(function () {
                return api.menu.delete(data.id);
            });
        };
        viewModel.prototype.UpdateEnable = function (data) {
            api.menu.update(data.id, !data.enabled).then(function () { });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=index.js.map