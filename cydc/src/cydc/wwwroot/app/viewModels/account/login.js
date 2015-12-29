define(["require", "exports", 'knockout', 'knockout.validation', 'service/api', 'plugins/router'], function (require, exports, ko, koval, api, router) {
    var viewModel = (function () {
        function viewModel() {
            this.userName = ko.observable().extend({
                required: true
            });
            this.password = ko.observable().extend({
                required: true
            });
            console.log(this);
        }
        viewModel.prototype.login = function () {
            if (this.allValid()) {
                api.account.login(this.userName(), this.password()).always(function () {
                    router.navigate('/');
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
