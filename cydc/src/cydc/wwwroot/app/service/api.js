var Cydc;
(function (Cydc) {
    var api = (function () {
        function api($http) {
            this.$http = $http;
            this.location = new location(this.$http);
            this.type = new tasteType(this.$http);
            this.menu = new foodMenu(this.$http);
            this.notice = new siteNotice(this.$http);
            this.order = new foodOrder(this.$http);
            this.auth = new Cydc.auth(this.$http);
            this.clientInfo = new foodOrderClientInfo(this.$http);
            this.user = new user(this.$http);
            this.accountDetails = new AccountDetails(this.$http);
        }
        api.$inject = ["$http"];
        return api;
    }());
    Cydc.api = api;
    var user = (function () {
        function user($http) {
            this.$http = $http;
        }
        user.prototype.list = function (query) {
            return this.$http.post("/api/user/list", query);
        };
        user.prototype.getUserAmount = function () {
            return this.$http.post("/api/user/getUserAmount", null);
        };
        return user;
    }());
    var AccountDetails = (function () {
        function AccountDetails($http) {
            this.$http = $http;
        }
        AccountDetails.prototype.list = function (query) {
            return this.$http.post("/api/accountDetails/list", query);
        };
        AccountDetails.prototype.create = function (userId, amount) {
            return this.$http.post('/api/accountDetails/create', { userId: userId, amount: amount });
        };
        return AccountDetails;
    }());
    var foodOrderClientInfo = (function () {
        function foodOrderClientInfo($http) {
            this.$http = $http;
        }
        foodOrderClientInfo.prototype.create = function () {
            return this.$http.post('/api/foodOrderClientInfo/create', null);
        };
        return foodOrderClientInfo;
    }());
    var foodOrder = (function () {
        function foodOrder($http) {
            this.$http = $http;
        }
        foodOrder.prototype.list = function (query) {
            return this.$http.post('/api/foodOrder/list', query);
        };
        foodOrder.prototype.create = function (menuId, locationId, tasteId, comment, name) {
            return this.$http.post('/api/foodOrder/create', { foodMenuId: menuId, locationId: locationId, tasteId: tasteId, comment: comment, userName: name });
        };
        foodOrder.prototype.delete = function (id) {
            return this.$http.post('/api/foodOrder/delete', { id: id });
        };
        foodOrder.prototype.pay = function (id) {
            return this.$http.post('/api/foodOrder/pay', { id: id });
        };
        foodOrder.prototype.cancelPay = function (id) {
            return this.$http.post('/api/foodOrder/cancelPay', { id: id });
        };
        foodOrder.prototype.update = function (id, comment) {
            return this.$http.post('/api/foodOrder/update', { id: id, comment: comment });
        };
        foodOrder.prototype.select = function (time, userName) {
            return this.$http.post('/api/foodOrder/list', { time: time, userName: userName });
        };
        foodOrder.prototype.historyList = function (query) {
            return this.$http.post('/api/foodOrder/historyList', query);
        };
        foodOrder.prototype.export = function (time, userName) {
            return this.$http.post('/api/foodOrder/export', { time: time, userName: userName });
        };
        return foodOrder;
    }());
    var menuIndex = (function () {
        function menuIndex($http) {
            this.$http = $http;
        }
        menuIndex.prototype.list = function (query) {
            return this.$http.post('/api/foodMenu/list', query);
        };
        return menuIndex;
    }());
    var foodMenu = (function () {
        function foodMenu($http) {
            this.$http = $http;
        }
        foodMenu.prototype.list = function (query) {
            return this.$http.post('/api/foodMenu/list', query);
        };
        foodMenu.prototype.enableList = function (query) {
            return this.$http.post('/api/foodMenu/enableList', query);
        };
        foodMenu.prototype.create = function (title, details, price) {
            return this.$http.post('/api/foodMenu/create', { details: details, title: title, price: price });
        };
        foodMenu.prototype.delete = function (id) {
            return this.$http.post('/api/foodMenu/delete', { id: id });
        };
        foodMenu.prototype.update = function (id, enabled) {
            return this.$http.post('/api/foodMenu/UpdateEnable', { id: id, enabled: enabled });
        };
        return foodMenu;
    }());
    var tasteType = (function () {
        function tasteType($http) {
            this.$http = $http;
        }
        tasteType.prototype.list = function (query) {
            return this.$http.post('/api/tasteType/list', query);
        };
        tasteType.prototype.enabledTasteTypes = function (query) {
            return this.$http.post('/api/tasteType/enabledTasteTypes', query);
        };
        tasteType.prototype.toggleEnable = function (id, enabled) {
            return this.$http.post('/api/tasteType/toggleEnable', { id: id, enabled: enabled });
        };
        tasteType.prototype.delete = function (id) {
            return this.$http.post('/api/tasteType/delete', { id: id });
        };
        tasteType.prototype.create = function (name) {
            return this.$http.post('/api/tasteType/create', { name: name });
        };
        return tasteType;
    }());
    var location = (function () {
        function location($http) {
            this.$http = $http;
        }
        location.prototype.list = function (query) {
            return this.$http.post('/api/location/list', query);
        };
        location.prototype.enabledLocationList = function (query) {
            return this.$http.post('/api/location/enabledLocationList', query);
        };
        location.prototype.toggleEnable = function (id, enabled) {
            return this.$http.post('/api/location/toggleEnable', { id: id, enabled: enabled });
        };
        location.prototype.delete = function (id) {
            return this.$http.post('/api/location/delete', { id: id });
        };
        location.prototype.create = function (name) {
            return this.$http.post('/api/location/create', { name: name });
        };
        return location;
    }());
    var siteNotice = (function () {
        function siteNotice($http) {
            this.$http = $http;
        }
        siteNotice.prototype.getSiteNotice = function () {
            return this.$http.post('/api/siteNotice/getSiteNotice', null);
        };
        siteNotice.prototype.update = function (content) {
            return this.$http.post('/api/siteNotice/update', { content: content });
        };
        return siteNotice;
    }());
})(Cydc || (Cydc = {}));
