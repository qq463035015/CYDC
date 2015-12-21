var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/pager'], function (require, exports, api, ko, utils, pager) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/location/list');
            this.allLocation = ko.observableArray();
            this.name = ko.observable();
            this.loadData();
        }
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('', '确定要删除吗？').then(function (cs) {
                cs.close();
                return api.location.delete(data.id);
            }).then(function () { return _this.loadData(); });
        };
        viewModel.prototype.add = function () {
            var _this = this;
            this.name() && api.location.create(this.name())
                .then(function () { return _this.loadData(); })
                .then(function () { return _this.name(''); });
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
//# sourceMappingURL=address.js.map