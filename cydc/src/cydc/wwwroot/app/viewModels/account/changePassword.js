define(["require", "exports", 'service/api', 'service/utils', 'knockout'], function (require, exports, api, utils, ko) {
    var viewModel = (function () {
        function viewModel() {
            this.password = ko.observable().extend({
                required: true,
                minLength: 6
            });
            this.newPassword = ko.observable().extend({
                required: true,
                minLength: 6
            });
            this.confirmedPassword = ko.observable().extend({
                equal: this.newPassword
            });
        }
        viewModel.prototype.changePassword = function () {
            var _this = this;
            if (utils.checkValid(this)) {
                api.account.changePassword(this.password(), this.newPassword(), this.confirmedPassword()).then(function () {
                    alert('密码修改成功。');
                    utils.navigateToCallbackOrHome();
                }).fail(function (xhr) { return _this.requestFailed(xhr); });
            }
        };
        viewModel.prototype.requestFailed = function (xhr) {
            if (xhr.status == 401) {
                alert('原密码错误');
            }
            else {
                alert('失败，不知道什么原因，自己想。');
            }
        };
        return viewModel;
    })();
    return new viewModel();
});
