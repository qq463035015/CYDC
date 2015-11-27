define(["require", "exports", 'jquery', 'plugins/http'], function (require, exports, $, http) {
    var service;
    (function (service) {
        var api = (function () {
            function api() {
                this.location = new location();
                this.type = new tasteType();
                this.menu = new foodMenu();
                this.notice = new siteNotice();
            }
            return api;
        })();
        service.api = api;
        var foodMenu = (function () {
            function foodMenu() {
            }
            foodMenu.prototype.list = function (query) {
                return $.post('/api/foodMenu/list', query);
            };
            foodMenu.prototype.Install = function (title, details, price) {
                return http.post('/api/foodMenu/install', { details: details, title: title, price: price });
            };
            foodMenu.prototype.delete = function (id) {
                return $.post('/api/foodMenu/delete', { id: id });
            };
            foodMenu.prototype.update = function (id, enable) {
                return $.post('/api/foodMenu/update', { id: id, enable: enable });
            };
            return foodMenu;
        })();
        var tasteType = (function () {
            function tasteType() {
            }
            tasteType.prototype.list = function (query) {
                return $.post('/api/tasteType/list', query);
            };
            tasteType.prototype.delete = function (id) {
                return $.post('/api/tasteType/delete', { id: id });
            };
            tasteType.prototype.install = function (name) {
                return $.post('/api/tasteType/install', { name: name });
            };
            return tasteType;
        })();
        var location = (function () {
            function location() {
            }
            location.prototype.list = function (query) {
                return $.post('/api/location/list', query);
            };
            location.prototype.delete = function (id) {
                return $.post('/api/location/delete', { id: id });
            };
            location.prototype.install = function (name) {
                return $.post('/api/location/install', { name: name });
            };
            return location;
        })();
        var siteNotice = (function () {
            function siteNotice() {
            }
            siteNotice.prototype.list = function (query) {
                return $.post('/api/siteNotice/list', query);
            };
            siteNotice.prototype.update = function (id, content) {
                return $.post('/api/siteNotice/update', { id: id, content: content });
            };
            return siteNotice;
        })();
    })(service || (service = {}));
    return new service.api();
});
//# sourceMappingURL=api.js.map