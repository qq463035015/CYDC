var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/pager', 'service/auth', 'moment'], function (require, exports, api, ko, pager, auth, moment) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            var _this = this;
            _super.call(this, '/api/foodOrder/historyList');
            this.onlyMe = ko.observable(true);
            this.queryTime = ko.observable(moment().format('YYYY-MM-DD'));
            this.amount = ko.observable();
            this.auth = auth;
            api.user.getUserAmount().then(function (data) {
                _this.amount(data);
            });
            this.search();
        }
        viewModel.prototype.search = function () {
            this.searchParams({ startTime: this.queryTime(), onlyMe: this.onlyMe() });
            this.loadData();
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
