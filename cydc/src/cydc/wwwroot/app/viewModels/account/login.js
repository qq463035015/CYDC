define(["require", "exports", 'knockout', 'service/api', 'service/utils'], function (require, exports, ko, api, utils) {
    "use strict";
    var viewModel = (function () {
        function viewModel() {
            this.userName = ko.observable().extend({
                required: true
            });
            this.password = ko.observable().extend({
                required: true
            });
        }
        viewModel.prototype.login = function () {
            var _this = this;
            if (utils.checkValid(this)) {
                api.account.login(this.userName(), this.password()).then(function () {
                    location.href = '/home/index';
                }).fail(function (xhr) { return _this.requestFailed(xhr); });
            }
        };
        viewModel.prototype.requestFailed = function (xhr) {
            if (xhr.status == 400) {
                alert('用户名或密码错误！');
            }
            else {
                alert("\u8BF7\u4E0D\u8981\u8FD9\u6837\u641E(" + xhr.status + ")");
            }
        };
        return viewModel;
    }());
    return new viewModel();
});
