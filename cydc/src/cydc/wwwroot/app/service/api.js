define(["require", "exports", 'plugins/http', 'service/auth'], function (require, exports, http, auth) {
    "use strict";
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
                this.accountDetails = new AccountDetails();
            }
            return api;
        }());
        service.api = api;
        var user = (function () {
            function user() {
            }
            user.prototype.list = function (query) {
                return http.post("/api/user/list", query);
            };
            user.prototype.getUserAmount = function () {
                return http.post("/api/user/getUserAmount", null);
            };
            return user;
        }());
        var AccountDetails = (function () {
            function AccountDetails() {
            }
            AccountDetails.prototype.list = function (query) {
                return http.post("/api/accountDetails/list", query);
            };
            AccountDetails.prototype.create = function (userId, amount) {
                return http.post('/api/accountDetails/create', { userId: userId, amount: amount });
            };
            return AccountDetails;
        }());
        var foodOrderClientInfo = (function () {
            function foodOrderClientInfo() {
            }
            foodOrderClientInfo.prototype.create = function () {
                return http.post('/api/foodOrderClientInfo/create', null);
            };
            return foodOrderClientInfo;
        }());
        var foodOrder = (function () {
            function foodOrder() {
            }
            foodOrder.prototype.list = function (query) {
                return http.post('/api/foodOrder/list', query);
            };
            foodOrder.prototype.create = function (menuId, locationId, tasteId, comment, name) {
                return http.post('/api/foodOrder/create', { foodMenuId: menuId, locationId: locationId, tasteId: tasteId, comment: comment, userName: name });
            };
            foodOrder.prototype.delete = function (id) {
                return http.post('/api/foodOrder/delete', { id: id });
            };
            foodOrder.prototype.pay = function (id) {
                return http.post('/api/foodOrder/pay', { id: id });
            };
            foodOrder.prototype.cancelPay = function (id) {
                return http.post('/api/foodOrder/cancelPay', { id: id });
            };
            foodOrder.prototype.pay_unrecord = function (id) {
                return http.post('/api/foodOrder/pay_unrecord', { id: id });
            };
            foodOrder.prototype.cancelPay_unrecord = function (id) {
                return http.post('/api/foodOrder/cancelPay_unrecord', { id: id });
            };
            foodOrder.prototype.update = function (id, comment) {
                return http.post('/api/foodOrder/update', { id: id, comment: comment });
            };
            foodOrder.prototype.select = function (time, userName) {
                return http.post('/api/foodOrder/list', { time: time, userName: userName });
            };
            foodOrder.prototype.historyList = function (query) {
                return http.post('/api/foodOrder/historyList', query);
            };
            foodOrder.prototype.export = function (time, userName) {
                return http.post('/api/foodOrder/export', { time: time, userName: userName });
            };
            return foodOrder;
        }());
        var menuIndex = (function () {
            function menuIndex() {
            }
            menuIndex.prototype.list = function (query) {
                return http.post('/api/foodMenu/list', query);
            };
            return menuIndex;
        }());
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
        }());
        var tasteType = (function () {
            function tasteType() {
            }
            tasteType.prototype.list = function (query) {
                return http.post('/api/tasteType/list', query);
            };
            tasteType.prototype.enabledTasteTypes = function (query) {
                return http.post('/api/tasteType/enabledTasteTypes', query);
            };
            tasteType.prototype.toggleEnable = function (id, enabled) {
                return http.post('/api/tasteType/toggleEnable', { id: id, enabled: enabled });
            };
            tasteType.prototype.delete = function (id) {
                return http.post('/api/tasteType/delete', { id: id });
            };
            tasteType.prototype.create = function (name) {
                return http.post('/api/tasteType/create', { name: name });
            };
            return tasteType;
        }());
        var location = (function () {
            function location() {
            }
            location.prototype.list = function (query) {
                return http.post('/api/location/list', query);
            };
            location.prototype.enabledLocationList = function (query) {
                return http.post('/api/location/enabledLocationList', query);
            };
            location.prototype.toggleEnable = function (id, enabled) {
                return http.post('/api/location/toggleEnable', { id: id, enabled: enabled });
            };
            location.prototype.delete = function (id) {
                return http.post('/api/location/delete', { id: id });
            };
            location.prototype.create = function (name) {
                return http.post('/api/location/create', { name: name });
            };
            return location;
        }());
        var siteNotice = (function () {
            function siteNotice() {
            }
            siteNotice.prototype.getSiteNotice = function () {
                return http.post('/api/siteNotice/getSiteNotice', null);
            };
            siteNotice.prototype.update = function (content) {
                return http.post('/api/siteNotice/update', { content: content });
            };
            return siteNotice;
        }());
        var account = (function () {
            function account() {
            }
            account.prototype.login = function (userName, password) {
                return http.post('/api/account/login', { userName: userName, password: password }).then(function () { return auth.onLogin(); });
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
            account.prototype.forgotPassword = function (email) {
                return http.post('/api/account/forgotPassword', {
                    email: email
                });
            };
            account.prototype.resetPassword = function (email, code, password, confirmedPassword) {
                return http.post('/api/account/resetPassword', {
                    email: email,
                    code: code,
                    password: password,
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
        }());
    })(service || (service = {}));
    return new service.api();
});
