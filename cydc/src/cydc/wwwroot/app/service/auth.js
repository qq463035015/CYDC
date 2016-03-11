var Cydc;
(function (Cydc) {
    var Service;
    (function (Service) {
        var Auth = (function () {
            function Auth($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.userName = "";
                this.authed = false;
                this.isAdmin = false;
            }
            Auth.prototype.refreshState = function () {
                var _this = this;
                return this.$http.post('/api/account/loginStatus', null).then(function (a) {
                    _this.userName = a.data.userName;
                    _this.authed = a.data.authed;
                    _this.isAdmin = a.data.isAdmin;
                });
            };
            Auth.prototype.onLogin = function () {
                this.refreshState();
            };
            Auth.prototype.onLogout = function () {
                this.refreshState();
            };
            Auth.prototype.login = function (userName, password, rememberMe) {
                var _this = this;
                return this.$http.post('/api/account/login', { userName: userName, password: password, rememberMe: rememberMe })
                    .then(function () { return _this.onLogin(); });
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
        Service.Auth = Auth;
    })(Service = Cydc.Service || (Cydc.Service = {}));
})(Cydc || (Cydc = {}));
