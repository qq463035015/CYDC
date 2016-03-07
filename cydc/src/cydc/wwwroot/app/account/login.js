var Cydc;
(function (Cydc) {
    var Account;
    (function (Account) {
        var LoginCtrl = (function () {
            function LoginCtrl(auth, $mdToast, $location, $mdDialog) {
                this.auth = auth;
                this.$mdToast = $mdToast;
                this.$location = $location;
                this.$mdDialog = $mdDialog;
                this.rememberMe = true;
                this.requesting = false;
            }
            LoginCtrl.prototype.login = function () {
                var _this = this;
                this.requesting = true;
                this.auth.login(this.userName, this.password, this.rememberMe).then(function () {
                    _this.$mdDialog.hide();
                }).catch(function (r) {
                    _this.$mdToast.showSimple("用户名或密码不正确。");
                }).finally(function () {
                    _this.requesting = false;
                });
            };
            LoginCtrl.prototype.cancel = function () {
                this.$mdDialog.cancel();
            };
            LoginCtrl.$inject = ["auth", "$mdToast", "$location", "$mdDialog"];
            return LoginCtrl;
        }());
        Account.LoginCtrl = LoginCtrl;
    })(Account = Cydc.Account || (Cydc.Account = {}));
})(Cydc || (Cydc = {}));
