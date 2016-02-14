var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'knockout', 'service/pager'], function (require, exports, ko, pager) {
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
        return viewModel;
    })(pager);
    return new viewModel();
});
