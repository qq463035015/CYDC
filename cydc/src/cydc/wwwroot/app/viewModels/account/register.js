define(["require", "exports", 'knockout', 'service/api', 'service/utils'], function (require, exports, ko, api, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.email = ko.observable().extend({
                email: true,
                required: true
            });
            this.username = ko.observable().extend({
                minLength: 2,
                required: true,
                validation: [
                    {
                        validator: function (characters) {
                            return characters.split("").every(function (c) { return 19968 <= c.charCodeAt(0) && c.charCodeAt(0) <= 40908; });
                        },
                        message: '必须输入中文'
                    }
                ]
            });
            this.password = ko.observable().extend({
                minLength: 6,
                required: true
            });
            this.confirmedPassword = ko.observable().extend({});
        }
        viewModel.prototype.register = function () {
            var _this = this;
            if (utils.checkValid(this)) {
                return api.account.register(this.email(), this.username(), this.password(), this.confirmedPassword()).then(function () {
                    utils.redirectToCallbackOrHome();
                }).fail(function (xhr) { return _this.requestFailed(xhr); });
            }
        };
        viewModel.prototype.requestFailed = function (xhr) {
            if (xhr.status == 400) {
                alert('有问题');
            }
        };
        return viewModel;
    })();
    return new viewModel();
});
