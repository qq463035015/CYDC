define(["require", "exports", 'knockout', 'jquery', 'plugins/http'], function (require, exports, ko, $, http) {
    var service;
    (function (service) {
        var pager = (function () {
            function pager(dataUrl) {
                var _this = this;
                // global config:
                this.maxPageToDisplay = 5;
                // pre-config:
                this.dataUrl = ko.observable();
                // backend returned fields:
                this.items = ko.observableArray();
                this.nextPageFirstItem = ko.observable();
                this.hasNext = ko.observable();
                // computed by backend fields:
                this.hasPrev = ko.pureComputed(function () { return _this.pageNumber() > 1; });
                // front-end state
                this.pageNumber = ko.observable(1);
                this.pageSize = ko.observable(14);
                this.orderBy = ko.observable();
                this.asc = ko.observable();
                this.searchParams = ko.observable();
                // front-end computed state
                this.prevPageNumber = ko.pureComputed(function () { return _this.pageNumber() - Number(_this.hasPrev()); });
                this.nextPageNumber = ko.pureComputed(function () { return _this.pageNumber() + Number(_this.hasNext()); });
                this.searchState = ko.pureComputed(function () {
                    return $.extend({}, _this.searchParams(), {
                        page: _this.pageNumber(),
                        orderBy: _this.orderBy(),
                        asc: _this.asc(),
                        pageSize: _this.pageSize()
                    });
                });
                this.dataUrl(dataUrl);
            }
            pager.prototype.loadData = function () {
                var _this = this;
                var searchParams = this.searchState();
                return http.post(this.dataUrl(), searchParams).then(function (data) {
                    _this.lastRaw = data;
                    _this.onDataRecieving(data);
                });
            };
            pager.prototype.loadPrevPage = function () {
                this.pageNumber(this.prevPageNumber());
                return this.loadData();
            };
            pager.prototype.loadNextPage = function () {
                this.pageNumber(this.nextPageNumber());
                return this.loadData();
            };
            pager.prototype.onDataRecieving = function (data) {
                this.items(data.items);
                this.nextPageFirstItem(data.nextPageFirstItem);
                this.hasNext(data.hasNext);
            };
            return pager;
        })();
        service.pager = pager;
    })(service || (service = {}));
    return service.pager;
});
