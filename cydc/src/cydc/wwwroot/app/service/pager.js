define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var service;
    (function (service) {
        var pager = (function () {
            function pager() {
                this.pageTotal = ko.observable();
                this.pageNumber = ko.observable();
                this.previousPage = ko.observable();
                this.nextPage = ko.observable();
                this.maxPageToDisplay = ko.observable();
                this.dataUrl = ko.observable();
                this.pageSize = ko.observable(12);
                this.orderBy = ko.observable();
                this.asc = ko.observable();
            }
            pager.prototype.loadData = function (page, orderBy, asc) {
                if (orderBy !== undefined)
                    this.orderBy(orderBy);
                if (asc !== undefined)
                    this.asc(asc);
                var searchParams = $.extend({}, {
                    page: page,
                    orderBy: this.orderBy(),
                    asc: this.asc(),
                    pageSize: this.pageSize()
                });
                $.post(this.dataUrl(), searchParams).then(function () { });
            };
            return pager;
        })();
        service.pager = pager;
    })(service || (service = {}));
    return service.pager;
});
//# sourceMappingURL=pager.js.map