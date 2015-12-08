define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.allMenu = ko.observableArray();
            this.details = ko.observable();
            this.title = ko.observable();
            this.price = ko.observable();
            this.loadList();
        }
        viewModel.prototype.loadList = function () {
            var _this = this;
            return api.menu.list().then(function (data) { return _this.allMenu(data); });
        };
        viewModel.prototype.add = function () {
            var _this = this;
            api.menu.create(this.details(), this.title(), this.price())
                .then(function () { return _this.loadList(); })
                .then(function () {
                _this.title(null);
                _this.price(null);
                _this.details(null);
            });
        };
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('', '确定要删除吗？').then(function (cs) {
                cs.close();
                return api.menu.delete(data.id);
            }).then(function () { return _this.loadList(); });
        };
        viewModel.prototype.UpdateEnable = function (data) {
            api.menu.update(data.id, !data.enabled).then(function () { });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=index.js.map