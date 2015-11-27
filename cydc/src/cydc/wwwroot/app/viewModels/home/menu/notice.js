define(["require", "exports", 'service/api', 'knockout'], function (require, exports, api, ko) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.notice = ko.observableArray();
            api.notice.list().then(function (data) { return _this.notice(data); });
        }
        viewModel.prototype.update = function () {
            api.notice.update(this.notice()[0].id, this.notice()[0].content).then(function () { });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=notice.js.map