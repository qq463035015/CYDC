define(["require", "exports", 'service/api', 'knockout'], function (require, exports, api, ko) {
    "use strict";
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.notice = ko.observable();
            api.notice.getSiteNotice().then(function (data) { return _this.notice(data); });
        }
        viewModel.prototype.update = function () {
            api.notice.update(this.notice().content).then(function () { });
        };
        return viewModel;
    }());
    return new viewModel();
});
