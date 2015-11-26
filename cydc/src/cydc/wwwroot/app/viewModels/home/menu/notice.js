define(["require", "exports", 'service/api', 'knockout'], function (require, exports, api, ko) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.notice = ko.observable();
            api.notice.list().then(function (data) { return _this.notice(data[0].content); });
        }
        viewModel.prototype.update = function (data) {
            api.notice.update(data.id, this.notice()).then(function () { location.reload(); });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=notice.js.map