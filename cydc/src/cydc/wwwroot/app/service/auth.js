define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var service;
    (function (service) {
        var auth = (function () {
            function auth() {
                this.userName = ko.pureComputed({
                    read: function () { return localStorage.getItem(keys.userName); },
                    write: function (v) { return localStorage.setItem(keys.userName, v); }
                });
            }
            auth.prototype.onLogin = function (ctx) {
                this.userName(ctx.userName);
            };
            auth.prototype.onLogout = function () {
                this.userName(null);
            };
            return auth;
        })();
        service.auth = auth;
        var keys = (function () {
            function keys() {
            }
            keys.userName = 'auth-userName';
            return keys;
        })();
    })(service || (service = {}));
    return new service.auth();
});
