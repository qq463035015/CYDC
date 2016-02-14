var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'knockout', 'service/utils', 'service/pager', 'service/ko_bindings'], function (require, exports, ko, utils, pager, kob) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/accountDetails/list');
            this.userName = ko.observable();
            this.loadData();
        }
        viewModel.prototype.search = function () {
            this.searchParams({ userName: this.userName() });
            this.loadData();
        };
        viewModel.prototype.viewFoodOrder = function (data) {
            utils.alert("\u8BA2\u5355 #" + data.foodOrderId, "\n\u7528\u6237\u540D\uFF1A" + data.foodOrder.orderUser.userName + " <br/>\n\u70B9\u9910\u65F6\u95F4\uFF1A" + kob.dateTimeText(data.foodOrder.orderTime) + " <br/>\n\u5907\u6CE8\uFF1A" + (data.foodOrder.comment || '无') + " <br/>");
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
