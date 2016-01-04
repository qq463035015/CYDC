define(["require", "exports", 'plugins/http', 'service/auth'], function (require, exports, http, auth) {
    var service;
    (function (service) {
        var api = (function () {
            function api() {
                this.location = new location();
                this.type = new tasteType();
                this.menu = new foodMenu();
                this.notice = new siteNotice();
                this.order = new foodOrder();
                this.account = new account();
                this.clientInfo = new foodOrderClientInfo();
                this.user = new user();
            }
            return api;
        })();
        service.api = api;
        var user = (function () {
            function user() {
            }
            user.prototype.list = function () {
                http.post("", null);
            };
            return user;
        })();
        var AccountDetails = (function () {
            function AccountDetails() {
            }
            AccountDetails.prototype.create = function (amount) {
                return http.post('/api/accountDetails/create', { amount: amount });
            };
            return AccountDetails;
        })();
        var foodOrderClientInfo = (function () {
            function foodOrderClientInfo() {
            }
            foodOrderClientInfo.prototype.create = function () {
                return http.post('/api/foodOrderClientInfo/create', null);
            };
            return foodOrderClientInfo;
        })();
        var foodOrder = (function () {
            function foodOrder() {
            }
            foodOrder.prototype.list = function (query) {
                return http.post('/api/foodOrder/list', query);
            };
            foodOrder.prototype.create = function (menuId, orderLocationId, tasteId, comment, price) {
                return http.post('/api/foodOrder/create', { foodMenuId: menuId, orderLocationId: orderLocationId, tasteId: tasteId, comment: comment, price: price, });
            };
            foodOrder.prototype.delete = function (id) {
                return http.post('/api/foodOrder/delete', { id: id });
            };
            foodOrder.prototype.select = function (time, userName) {
                return http.post('/api/foodOrder/list', { time: time, userName: userName });
            };
            foodOrder.prototype.historyList = function (query) {
                return http.post('/api/foodOrder/historyList', query);
            };
            return foodOrder;
        })();
        var menuIndex = (function () {
            function menuIndex() {
            }
            menuIndex.prototype.list = function (query) {
                return http.post('/api/foodMenu/list', query);
            };
            return menuIndex;
        })();
        var foodMenu = (function () {
            function foodMenu() {
            }
            foodMenu.prototype.list = function (query) {
                return http.post('/api/foodMenu/list', query);
            };
            foodMenu.prototype.enableList = function (query) {
                return http.post('/api/foodMenu/enableList', query);
            };
            foodMenu.prototype.create = function (title, details, price) {
                return http.post('/api/foodMenu/create', { details: details, title: title, price: price });
            };
            foodMenu.prototype.delete = function (id) {
                return http.post('/api/foodMenu/delete', { id: id });
            };
            foodMenu.prototype.update = function (id, enabled) {
                return http.post('/api/foodMenu/UpdateEnable', { id: id, enabled: enabled });
            };
            return foodMenu;
        })();
        var tasteType = (function () {
            function tasteType() {
            }
            tasteType.prototype.list = function (query) {
                return http.post('/api/tasteType/list', query);
            };
            tasteType.prototype.tasteTypeDropdownList = function (query) {
                return http.post('/api/tasteType/tasteTypeDropdownList', query);
            };
            tasteType.prototype.delete = function (id) {
                return http.post('/api/tasteType/delete', { id: id });
            };
            tasteType.prototype.create = function (name) {
                return http.post('/api/tasteType/create', { name: name });
            };
            return tasteType;
        })();
        var location = (function () {
            function location() {
            }
            location.prototype.list = function (query) {
                return http.post('/api/location/list', query);
            };
            location.prototype.locationDropdownList = function (query) {
                return http.post('/api/location/locationDropdownList', query);
            };
            location.prototype.delete = function (id) {
                return http.post('/api/location/delete', { id: id });
            };
            location.prototype.create = function (name) {
                return http.post('/api/location/create', { name: name });
            };
            return location;
        })();
        var siteNotice = (function () {
            function siteNotice() {
            }
            siteNotice.prototype.list = function (query) {
                return http.post('/api/siteNotice/list', query);
            };
            siteNotice.prototype.update = function (id, content) {
                return http.post('/api/siteNotice/update', { id: id, content: content });
            };
            return siteNotice;
        })();
        var account = (function () {
            function account() {
            }
            account.prototype.login = function (userName, password) {
                return http.post('/api/account/login', { userName: userName, password: password }).then(function (ctx) {
                    auth.onLogin(ctx);
                });
            };
            account.prototype.register = function (email, username, password, confirmedPassword) {
                return http.post('/api/account/register', {
                    email: email,
                    username: username,
                    password: password,
                    confirmedPassword: confirmedPassword
                });
            };
            account.prototype.changePassword = function (password, newPassword, confirmedPassword) {
                return http.post('/api/account/changePassword', {
                    password: password,
                    newPassword: newPassword,
                    confirmedPassword: confirmedPassword
                });
            };
            account.prototype.logout = function () {
                return http.post('/api/account/logout', null).always(function () {
                    auth.onLogout();
                });
            };
            account.prototype.checkUserName = function (userName) {
                return http.get('/api/account/checkUserName', { username: userName });
            };
            account.prototype.checkEmail = function (email) {
                return http.get('/api/account/checkEmail', { email: email });
            };
            return account;
        })();
    })(service || (service = {}));
    return new service.api();
});
