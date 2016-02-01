define(["require", "exports", 'knockout', 'plugins/http'], function (require, exports, ko, http) {
    var service;
    (function (service) {
        var auth = (function () {
            function auth() {
                this.authed = ko.observable();
                this.userName = ko.observable();
                this.isAdmin = ko.observable(false);
                this.refreshState();
            }
            auth.prototype.refreshState = function () {
                var _this = this;
                return http.post('/api/account/loginStatus', null).then(function (a) {
                    _this.authed(a.authed);
                    _this.userName(a.userName);
                    _this.isAdmin(a.isAdmin);
                });
            };
            auth.prototype.onLogin = function () {
                this.refreshState();
            };
            auth.prototype.onLogout = function () {
                this.refreshState();
            };
            return auth;
        })();
        service.auth = auth;
    })(service || (service = {}));
    return new service.auth();
});
