define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.allType = ko.observableArray();
            this.name = ko.observable();
            this.loadList();
        }
        viewModel.prototype.loadList = function () {
            var _this = this;
            return api.type.list().then(function (data) { return _this.allType(data); });
        };
        viewModel.prototype.add = function () {
            var _this = this;
            this.name() && api.type.create(this.name()).then(function () {
                return _this.loadList();
            }).then(function () { return _this.name(null); });
        };
        viewModel.prototype.drop = function (data) {
            var _this = this;
            return utils.confirm('', '你确定要删除吗？').then(function (cs) {
                cs.close();
                return api.type.delete(data.id);
            }).then(function () { return _this.loadList(); });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=type.js.map