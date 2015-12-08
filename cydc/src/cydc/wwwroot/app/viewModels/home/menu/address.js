define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.allLocation = ko.observableArray();
            this.name = ko.observable();
            this.loadList();
        }
        viewModel.prototype.loadList = function () {
            var _this = this;
            return api.location.list().then(function (data) { return _this.allLocation(data); });
        };
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('', '确定要删除吗？').then(function (cs) {
                cs.close();
                return api.location.delete(data.id);
            }).then(function () { return _this.loadList(); });
        };
        viewModel.prototype.add = function () {
            var _this = this;
            this.name() && api.location.create(this.name())
                .then(function () { return _this.loadList(); })
                .then(function () { return _this.name(''); });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=address.js.map