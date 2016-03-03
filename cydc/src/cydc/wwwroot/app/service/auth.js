var Cydc;
(function (Cydc) {
    var auth = (function () {
        function auth($http) {
            this.$http = $http;
            this.refreshState();
        }
        auth.prototype.refreshState = function () {
            var _this = this;
            return this.$http.post('/api/account/loginStatus', null).then(function (a) {
                _this.authed = a.authed;
                _this.userName = a.userName;
                _this.isAdmin = a.isAdmin;
            });
        };
        auth.prototype.onLogin = function () {
            this.refreshState();
        };
        auth.prototype.onLogout = function () {
            this.refreshState();
        };
        auth.prototype.login = function (userName, password) {
            var _this = this;
            return this.$http.post('/api/account/login', { userName: userName, password: password }).then(function () { return _this.onLogin(); });
        };
        auth.prototype.register = function (email, username, password, confirmedPassword) {
            return this.$http.post('/api/account/register', {
                email: email,
                username: username,
                password: password,
                confirmedPassword: confirmedPassword
            });
        };
        auth.prototype.changePassword = function (password, newPassword, confirmedPassword) {
            return this.$http.post('/api/account/changePassword', {
                password: password,
                newPassword: newPassword,
                confirmedPassword: confirmedPassword
            });
        };
        auth.prototype.forgotPassword = function (email) {
            return this.$http.post('/api/account/forgotPassword', {
                email: email
            });
        };
        auth.prototype.resetPassword = function (email, code, password, confirmedPassword) {
            return this.$http.post('/api/account/resetPassword', {
                email: email,
                code: code,
                password: password,
                confirmedPassword: confirmedPassword
            });
        };
        auth.prototype.logout = function () {
            var _this = this;
            return this.$http.post("/api/account/logout", null).finally(function () {
                _this.onLogout();
            });
        };
        auth.prototype.checkUserName = function (userName) {
            return this.$http.post('/api/account/checkUserName', { username: userName });
        };
        auth.prototype.checkEmail = function (email) {
            return this.$http.post('/api/account/checkEmail', { email: email });
        };
        auth.$inject = ["$http"];
        return auth;
    }());
    Cydc.auth = auth;
})(Cydc || (Cydc = {}));
