var Cydc;
(function (Cydc) {
    var Account;
    (function (Account) {
        var LoginCtrl = (function () {
            function LoginCtrl(auth, mdToast, location) {
                this.auth = auth;
                this.mdToast = mdToast;
                this.location = location;
                this.rememberMe = true;
                this.requesting = false;
            }
            LoginCtrl.prototype.login = function () {
                var _this = this;
                this.requesting = true;
                this.auth.login(this.userName, this.password, this.rememberMe).then(function () {
                    _this.location.path("/");
                }).catch(function (r) {
                    _this.mdToast.showSimple("Username or password not correct.");
                }).finally(function () {
                    _this.requesting = false;
                });
            };
            LoginCtrl.$inject = ["auth", "$mdToast", "$location"];
            return LoginCtrl;
        }());
        Account.LoginCtrl = LoginCtrl;
    })(Account = Cydc.Account || (Cydc.Account = {}));
})(Cydc || (Cydc = {}));
