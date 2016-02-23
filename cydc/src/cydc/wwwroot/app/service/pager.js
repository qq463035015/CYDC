define(["require", "exports", "knockout", "jquery", "plugins/http", "service/utils"], function (require, exports, ko, $, http, utils) {
    "use strict";
    var service;
    (function (service) {
        "use strict";
        var Pager = (function () {
            function Pager(dataUrl) {
                var _this = this;
                // global config:
                this.maxPageToDisplay = 5;
                // pre-config:
                this.dataUrl = ko.observable();
                // backend returned fields:
                this.items = ko.observableArray();
                this.count = ko.observable();
                // computed by backend fields:
                this.hasNext = ko.pureComputed(function () { return _this.count() > _this.pageNumber() * _this.pageSize(); });
                this.hasPrev = ko.pureComputed(function () { return _this.pageNumber() > 1; });
                this.itemFrom = ko.pureComputed(function () { return (_this.pageNumber() - 1) * _this.pageSize() + 1; });
                this.itemTo = ko.pureComputed(function () { return _this.itemFrom() + _this.items().length; });
                this.pageCount = ko.pureComputed(function () { return Math.ceil(_this.count() / _this.pageSize()); });
                // pagerButtons
                this.pagerButtons = ko.pureComputed(function () {
                    var all = Array();
                    var centerPageCount = 5;
                    var sidePageCount = Math.floor(centerPageCount / 2);
                    var edgeFrom = _this.pageNumber() - sidePageCount < 0;
                    var edgeTo = _this.pageNumber() + sidePageCount > _this.pageCount();
                    var dotsFrom = edgeTo ? _this.pageCount() - centerPageCount + 1 : _this.pageNumber() - sidePageCount;
                    var dotsTo = edgeFrom ? centerPageCount : _this.pageNumber() + sidePageCount;
                    dotsFrom = utils.clamp(dotsFrom, 1, _this.pageCount());
                    dotsTo = utils.clamp(dotsTo, 1, _this.pageCount());
                    _this.hasPrev() && all.push({
                        type: "prev",
                        click: function () { return _this.loadPrevPage(); },
                        page: _this.prevPageNumber(),
                        active: false
                    });
                    (1 < dotsFrom) && all.push({
                        type: "page",
                        click: function () { return _this.loadFirstPage(); },
                        page: 1,
                        active: false
                    });
                    (1 < dotsFrom) && all.push({
                        type: "dot",
                        click: null,
                        page: null,
                        active: false
                    });
                    for (var i = dotsFrom; i <= dotsTo; ++i)
                        (function (i) {
                            all.push({
                                click: function () { return _this.loadPage(i); },
                                page: i,
                                type: "page",
                                active: i == _this.pageNumber()
                            });
                        })(i);
                    (_this.pageCount() > dotsTo) && all.push({
                        type: "dot",
                        click: null,
                        page: null,
                        active: false
                    });
                    (_this.pageCount() > dotsTo) && all.push({
                        type: "page",
                        click: function () { return _this.loadLastPage(); },
                        page: _this.pageCount(),
                        active: false
                    });
                    _this.hasNext() && all.push({
                        type: "next",
                        click: function () { return _this.loadNextPage(); },
                        page: _this.nextPageNumber(),
                        active: false
                    });
                    return all;
                });
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
                this.loading = ko.observable(false);
                this.dataUrl(dataUrl);
            }
            Pager.prototype.loadData = function () {
                var _this = this;
                var searchParams = this.searchState();
                this.loading(true);
                return http.post(this.dataUrl(), searchParams).then(function (data) {
                    _this.loading(false);
                    _this.onDataRecieving(data);
                });
            };
            Pager.prototype.loadPage = function (pageNumber) {
                if (typeof pageNumber != 'number')
                    throw new Error("PAGE NUMBER MUST BE NUMBER!");
                this.pageNumber(pageNumber);
                return this.loadData();
            };
            Pager.prototype.loadFirstPage = function () {
                return this.loadPage(1);
            };
            Pager.prototype.loadLastPage = function () {
                return this.loadPage(this.pageCount());
            };
            Pager.prototype.loadPrevPage = function () {
                return this.loadPage(this.prevPageNumber());
            };
            Pager.prototype.loadNextPage = function () {
                return this.loadPage(this.nextPageNumber());
            };
            Pager.prototype.onDataRecieving = function (data) {
                this.items(data.items);
                this.count(data.count);
            };
            return Pager;
        }());
        service.Pager = Pager;
    })(service || (service = {}));
    return service.Pager;
});
