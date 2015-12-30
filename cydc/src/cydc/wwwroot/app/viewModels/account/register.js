define(["require", "exports", 'knockout', 'service/api', 'service/utils'], function (require, exports, ko, api, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.email = ko.observable().extend({
                email: true,
                required: true,
                validation: [
                    {
                        async: true,
                        validator: function (val, newval, callback) {
                            return api.account.checkEmail(val)
                                .then(function (result) { return callback(result); });
                        },
                        message: '此字段有重复'
                    }
                ]
            });
            this.username = ko.observable().extend({
                minLength: 2,
                required: true,
                validation: [
                    {
                        validator: function (characters) { return /^[\u4e00-\u9fcc]+$/g.test(characters); },
                        message: '必须输入中文'
                    },
                    {
                        async: true,
                        validator: function (val, newval, callback) {
                            return api.account.checkUserName(val)
                                .then(function (result) { return callback(result); });
                        },
                        message: '此字段有重复'
                    }
                ]
            });
            this.password = ko.observable().extend({
                minLength: 6,
                required: true
            });
            this.confirmedPassword = ko.observable().extend({
                equal: this.password
            });
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
