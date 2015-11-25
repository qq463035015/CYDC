define(["require", "exports", 'plugins/http'], function (require, exports, http) {
    var service;
    (function (service) {
        var api = (function () {
            function api() {
                this.location = new location();
            }
            return api;
        })();
        service.api = api;
        var location = (function () {
            function location() {
            }
            location.prototype.list = function (query) {
                return http.post('/api/location/list', query);
            };
            location.prototype.delete = function (id) {
                return http.post('/api/location/delete', { id: id });
            };
            return location;
        })();
    })(service || (service = {}));
    return new service.api();
});
//# sourceMappingURL=api.js.map