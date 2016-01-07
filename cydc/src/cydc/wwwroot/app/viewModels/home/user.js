var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'knockout', 'service/api', 'service/pager', 'service/utils'], function (require, exports, ko, api, pager, utils) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, "/api/user/list");
            this.userName = ko.observable();
            this.userId = ko.observable();
            this.price = ko.observable();
            this.loadData();
        }
        viewModel.prototype.addAmount = function (data) {
            var _this = this;
            api.accountDetails.create(this.userId(), this.price()).then(function () {
                $('#modal-sample').modal('hide');
                utils.confirm('', '添加成功').then(function (cs) { return cs.close(); });
                _this.loadData();
                _this.price(null);
            });
        };
        viewModel.prototype.saveUserId = function (data) {
            this.userId(data.userId);
        };
        viewModel.prototype.query = function () {
            this.searchParams({ userName: this.userName() });
            this.loadData();
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
