var Cydc;
(function (Cydc) {
    var Auth = (function () {
        function Auth($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        Auth.prototype.checkLogin = function () {
            var _this = this;
            var defer = this.$q.defer();
            this.refreshState().then(function () {
                if (_this.authed)
                    defer.resolve();
                if (!_this.authed)
                    defer.reject();
            }).catch(function (reason) {
                defer.reject(reason);
            });
            return defer.promise;
        };
        Auth.prototype.refreshState = function () {
            var _this = this;
            return this.$http.post('/api/account/loginStatus', null).then(function (a) {
                _this.authed = a.authed;
                _this.userName = a.userName;
                _this.isAdmin = a.isAdmin;
            });
        };
        Auth.prototype.onLogin = function () {
            this.refreshState();
        };
        Auth.prototype.onLogout = function () {
            this.refreshState();
        };
        Auth.prototype.login = function (userName, password) {
            var _this = this;
            return this.$http.post('/api/account/login', { userName: userName, password: password }).then(function () { return _this.onLogin(); });
        };
        Auth.prototype.register = function (email, username, password, confirmedPassword) {
            return this.$http.post('/api/account/register', {
                email: email,
                username: username,
                password: password,
                confirmedPassword: confirmedPassword
            });
        };
        Auth.prototype.changePassword = function (password, newPassword, confirmedPassword) {
            return this.$http.post('/api/account/changePassword', {
                password: password,
                newPassword: newPassword,
                confirmedPassword: confirmedPassword
            });
        };
        Auth.prototype.forgotPassword = function (email) {
            return this.$http.post('/api/account/forgotPassword', {
                email: email
            });
        };
        Auth.prototype.resetPassword = function (email, code, password, confirmedPassword) {
            return this.$http.post('/api/account/resetPassword', {
                email: email,
                code: code,
                password: password,
                confirmedPassword: confirmedPassword
            });
        };
        Auth.prototype.logout = function () {
            var _this = this;
            return this.$http.post("/api/account/logout", null).finally(function () {
                _this.onLogout();
            });
        };
        Auth.prototype.checkUserName = function (userName) {
            return this.$http.post('/api/account/checkUserName', { username: userName });
        };
        Auth.prototype.checkEmail = function (email) {
            return this.$http.post('/api/account/checkEmail', { email: email });
        };
        Auth.$inject = ["$http", "$q"];
        return Auth;
    }());
    Cydc.Auth = Auth;
})(Cydc || (Cydc = {}));
