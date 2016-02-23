import ko = require("knockout");
import $ = require("jquery");
import http = require("plugins/http");
import utils = require("service/utils");

module service {
    "use strict";

    export class Pager<T> {
        // global config:
        maxPageToDisplay = 5;

        // pre-config:
        dataUrl = ko.observable<string>();

        // backend returned fields:
        items = ko.observableArray<T>();
        count = ko.observable<number>();

        // computed by backend fields:
        hasNext = ko.pureComputed(() => this.count() > this.pageNumber() * this.pageSize());
        hasPrev = ko.pureComputed(() => this.pageNumber() > 1);
        itemFrom = ko.pureComputed(() => (this.pageNumber() - 1) * this.pageSize() + 1);
        itemTo = ko.pureComputed(() => this.itemFrom() + this.items().length);
        pageCount = ko.pureComputed(() => Math.ceil(this.count() / this.pageSize()));

        // pagerButtons
        pagerButtons = ko.pureComputed(() => {
            let all = Array<IPagerButton>();
            const centerPageCount = 5;
            const sidePageCount = Math.floor(centerPageCount / 2);

            let edgeFrom = this.pageNumber() - sidePageCount < 0;
            let edgeTo = this.pageNumber() + sidePageCount > this.pageCount();
            
            let dotsFrom = edgeTo ? this.pageCount() - centerPageCount + 1 : this.pageNumber() - sidePageCount;
            let dotsTo = edgeFrom ? centerPageCount : this.pageNumber() + sidePageCount;
            dotsFrom = utils.clamp(dotsFrom, 1, this.pageCount());
            dotsTo = utils.clamp(dotsTo, 1, this.pageCount());
            
            this.hasPrev() && all.push({
                type: PagerButtonType.prev,
                click: () => this.loadPrevPage(),
                page: this.prevPageNumber(), 
                active: false
            });

            (1 < dotsFrom) && all.push({
                type: PagerButtonType.page,
                click: () => this.loadFirstPage(),
                page: 1,
                active: false
            });

            (1 < dotsFrom) && all.push({
                type: PagerButtonType.dot,
                click: null,
                page: null, 
                active: false
            });
            
            for (var i = dotsFrom; i <= dotsTo; ++i) ((i) => {
                all.push({
                    click: () => this.loadPage(i),
                    page: i,
                    type: PagerButtonType.page,
                    active: i == this.pageNumber()
                });
            })(i);

            (this.pageCount() > dotsTo) && all.push({
                type: PagerButtonType.dot,
                click: null,
                page: null, 
                active: false
            });

            (this.pageCount() > dotsTo) && all.push({
                type: PagerButtonType.page,
                click: () => this.loadLastPage(),
                page: this.pageCount(),
                active: false
            });

            this.hasNext() && all.push({
                type: PagerButtonType.next,
                click: () => this.loadNextPage(),
                page: this.nextPageNumber(), 
                active: false
            });

            return all;
        });

        // front-end state
        pageNumber = ko.observable<number>(1);
        pageSize = ko.observable<number>(14);
        orderBy = ko.observable<string>();
        asc = ko.observable<boolean>();
        searchParams = ko.observable<any>();

        // front-end computed state
        prevPageNumber = ko.pureComputed(() => this.pageNumber() - Number(this.hasPrev()));
        nextPageNumber = ko.pureComputed(() => this.pageNumber() + Number(this.hasNext()));
        searchState = ko.pureComputed(() => {
            return $.extend({}, this.searchParams(), {
                page: this.pageNumber(),
                orderBy: this.orderBy(),
                asc: this.asc(),
                pageSize: this.pageSize()
            });
        });

        constructor(dataUrl?: string) {
            this.dataUrl(dataUrl);
        }

        loading = ko.observable(false);
        loadData() {
            var searchParams = this.searchState();
            this.loading(true);
            return http.post(this.dataUrl(), searchParams).then((data: IBackendPagerDto<T>) => {
                this.loading(false);
                this.onDataRecieving(data);
            });
        }

        loadPage(pageNumber: number) {
            if (typeof pageNumber != 'number') throw new Error("PAGE NUMBER MUST BE NUMBER!");
            this.pageNumber(pageNumber);
            return this.loadData();
        }

        loadFirstPage() {
            return this.loadPage(1);
        }

        loadLastPage() {
            return this.loadPage(this.pageCount());
        }

        loadPrevPage() {
            return this.loadPage(this.prevPageNumber());
        }

        loadNextPage() {
            return this.loadPage(this.nextPageNumber());
        }

        onDataRecieving(data: IBackendPagerDto<T>) {
            this.items(data.items);
            this.count(data.count);
        }
    }

    interface IBackendPagerDto<T> {
        items: T[];
        count: number;
    }

    export interface IPagerButton {
        type: PagerButtonType;
        page: number;
        active: boolean;
        click: () => void;
    }

    class PagerButtonType {
        static first = "first";
        static prev = "prev";
        static dot = "dot";
        static page = "page";
        static next = "next";
        static last = "last";
    }
}

export = service.Pager;