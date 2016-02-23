define(["require", "exports", 'service/api', 'service/utils', 'knockout', 'plugins/router'], function (require, exports, api, utils, ko, router) {
    "use strict";
    var viewModel = (function () {
        function viewModel() {
            this.email = ko.observable();
        }
        viewModel.prototype.commit = function () {
            var _this = this;
            if (utils.checkValid(this)) {
                api.account.forgotPassword(this.email()).then(function () {
                    return utils.alert("\u5982\u679C\u60A8\u8F93\u5165\u7684\u90AE\u7BB1\u6B63\u786E\uFF0C\u8BF7\u524D\u5F80\u4F60\u7684\u90AE\u7BB1" + _this.email() + "\u67E5\u770B\u3002");
                }).then(function () {
                    router.navigate("/");
                }).fail(function (xhr) {
                    utils.alert("\u53D1\u9001\u91CD\u7F6E\u5BC6\u7801\u90AE\u4EF6\u5931\u8D25(" + xhr.status + ")\u3002");
                });
            }
        };
        return viewModel;
    }());
    return new viewModel();
});
