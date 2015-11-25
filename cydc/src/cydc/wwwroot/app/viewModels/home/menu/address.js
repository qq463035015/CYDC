define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allLocation = ko.observableArray();
            api.location.list().then(function (data) { return _this.allLocation(data); });
        }
        viewModel.prototype.drop = function (data) {
            utils.confirm('', '确定要删除吗？').then(function () {
                return api.location.delete(data.id);
            });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=address.js.map