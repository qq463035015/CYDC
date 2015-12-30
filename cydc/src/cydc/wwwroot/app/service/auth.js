define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var service;
    (function (service) {
        var auth = (function () {
            function auth() {
                this.authed = ko.observable();
                this.userName = ko.observable();
                this.loadState();
            }
            auth.prototype.onLogin = function (ctx) {
                this.authed(true);
                this.userName(ctx.userName);
                this.saveState();
            };
            auth.prototype.onLogout = function () {
                this.authed(false);
                this.userName(null);
                this.saveState();
            };
            auth.prototype.loadState = function () {
                var obj = JSON.parse(localStorage.getItem(keys.authObj));
                if (obj != null) {
                    this.userName(obj.userName);
                    this.authed(obj.authed);
                }
            };
            auth.prototype.saveState = function () {
                var obj = {
                    authed: this.authed(),
                    userName: this.userName()
                };
                localStorage.setItem(keys.authObj, JSON.stringify(obj));
            };
            return auth;
        })();
        service.auth = auth;
        var keys = (function () {
            function keys() {
            }
            keys.authObj = 'auth-obj';
            return keys;
        })();
    })(service || (service = {}));
    return new service.auth();
});
