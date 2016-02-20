define(["require", "exports", 'service/api', 'service/utils', 'knockout', 'plugins/router'], function (require, exports, api, utils, ko, router) {
    var viewModel = (function () {
        function viewModel() {
            this.email = ko.observable();
            this.password = ko.observable();
            this.confirmedPassword = ko.observable();
        }
        viewModel.prototype.commit = function () {
            if (utils.checkValid(this)) {
                api.account.resetPassword(this.email(), utils.urlQuery("code"), this.password(), this.confirmedPassword()).then(function () {
                    return utils.alert("密码已经重置，请使用新密码进行登录");
                }).then(function () {
                    router.navigate("/account/login");
                }).fail(function (xhr) {
                    utils.alert("\u5BC6\u7801\u91CD\u7F6E\u5931\u8D25(" + xhr.status + ")\u3002");
                });
            }
        };
        return viewModel;
    })();
    return new viewModel();
});
