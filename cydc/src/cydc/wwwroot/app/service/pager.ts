import ko = require('knockout');
import router = require('plugins/router');

module service {
    export class pager {
        pageTotal = ko.observable<number>();
        pageNumber = ko.observable<number>();
        previousPage = ko.observable<number>();
        nextPage = ko.observable<number>();
        maxPageToDisplay = ko.observable<number>();
        dataUrl = ko.observable<string>();

        pageSize = ko.observable<number>(12);
        orderBy = ko.observable<string>();
        asc = ko.observable<boolean>();

        constructor() {

        }

        loadData(page: number, orderBy?: string, asc?: boolean) {
            if (orderBy !== undefined) this.orderBy(orderBy);
            if (asc !== undefined) this.asc(asc);
            var searchParams = $.extend({}, {
                page: page,
                orderBy: this.orderBy(),
                asc: this.asc(),
                pageSize: this.pageSize()
            });

            $.post(this.dataUrl(), searchParams).then(() => { });
        }
    }
}

export = service.pager;