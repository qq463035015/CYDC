var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'knockout', 'service/pager', 'service/ko_bindings'], function (require, exports, ko, pager, ko_bindings) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/foodOrder/historyList');
            this.onlyMe = ko.observable(true);
            this.queryTime = ko.observable();
            ko_bindings.fuck();
            this.query();
        }
        viewModel.prototype.query = function () {
            this.searchParams({ time: this.queryTime(), onlyMe: this.onlyMe() });
            this.loadData();
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
