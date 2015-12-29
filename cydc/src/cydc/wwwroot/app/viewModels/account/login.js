define(["require", "exports", 'knockout', 'knockout.validation', 'service/api', 'plugins/router', 'service/utils'], function (require, exports, ko, koval, api, router, utils) {
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
            if (this.allValid()) {
                api.account.login(this.userName(), this.password()).then(function () {
                    router.navigate(utils.urlQuery('returnUrl') || '/');
                }).fail(function (xhr) {
                    if (xhr.status == 400) {
                        alert('用户名或密码错误！');
                    }
                });
            }
        };
        viewModel.prototype.allValid = function () {
            var errors = koval.group(this);
            if (errors().length > 0)
                errors.showAllMessages();
            return errors().length == 0;
        };
        return viewModel;
    })();
    return new viewModel();
});
