define(["require", "exports", 'plugins/http'], function (require, exports, http) {
    var service;
    (function (service) {
        var business = (function () {
            function business() {
                this.location = new location();
            }
            return business;
        })();
        service.business = business;
        var location = (function () {
            function location() {
            }
            location.prototype.list = function () {
                return http.post('/api/location/list', {});
            };
            return location;
        })();
    })(service || (service = {}));
    return new service.business();
});
//# sourceMappingURL=business.js.map