import ko = require('knockout');
import $ = require('jquery');
import router = require('plugins/router');
import http = require('plugins/http');

module service {
    export class pager<T> {
        // global config:
        maxPageToDisplay = 5;

        // pre-config:
        dataUrl = ko.observable<string>();

        // backend returned fields:
        items = ko.observableArray<T>();
        nextPageFirstItem = ko.observable<T>();
        hasNext = ko.observable<boolean>();
        lastRaw: backendPagerContext<T>;

        // computed by backend fields:
        hasPrev = ko.pureComputed(() => this.pageNumber() > 1);

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

        loadData() {
            var searchParams = this.searchState();
            return http.post(this.dataUrl(), searchParams).then((data: backendPagerContext<T>) => {
                this.lastRaw = data;
                this.onDataRecieving(data);
            });
        }

        loadPrevPage() {
            this.pageNumber(this.prevPageNumber());
            return this.loadData();
        }

        loadNextPage() {
            this.pageNumber(this.nextPageNumber());
            return this.loadData();
        }

        onDataRecieving(data: backendPagerContext<T>) {
            this.items(data.items);
            this.nextPageFirstItem(data.nextPageFirstItem);
            this.hasNext(data.hasNext);
        }
    }

    interface backendPagerContext<T> {
        items: T[];
        nextPageFirstItem: T, 
        hasNext: boolean, 
        hasPrev: boolean
    }
}

export = service.pager;