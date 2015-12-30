var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/pager'], function (require, exports, api, ko, utils, pager) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/foodOrder/list');
            this.queryTime = ko.observable();
            this.userName = ko.observable();
            window['vm'] = this;
            this.loadData();
        }
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('', '确定要退订吗？').then(function (cs) {
                cs.close();
                return api.order.delete(data.id);
            }).then(function () { return _this.loadData(); });
        };
        viewModel.prototype.query = function () {
            this.searchParams({ time: this.queryTime(), userName: this.userName() });
            this.loadData();
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
