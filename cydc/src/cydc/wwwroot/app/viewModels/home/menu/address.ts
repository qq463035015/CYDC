import ko = require('knockout');
import router = require('plugins/router');
class Pager {
    page = ko.observable<number>(1);
    pageSize = ko.observable<number>(12);
    orderBy = ko.observable<string>();
    asc = ko.observable<boolean>(true);

    loadData(url: string, page?: number, pageSize?: number, orderBy?: string, asc?: boolean) {
        if (orderBy !== undefined) this.orderBy(orderBy);
        if (asc !== undefined) this.asc(asc);
        var searchParams = {
            page: this.page(),
            pageSize: this.pageSize(),
            orderBy: this.orderBy(),
            asc: this.asc()
        };
        var result;
        $.post(`/api/${(url)}/list`, searchParams).then(data => { result = data; });
        return result
    }
}

class viewModel {
    page = new Pager();

    foodMenu = ko.observableArray();

    tasteType = ko.observableArray();
    location = ko.observableArray();
    siteNotice = ko.observableArray();

    constructor() {
        var url = ['foodMenu', 'tasteType', 'location', 'siteNotice'];
        this.foodMenu(this.page.loadData(url[0]));
        this.tasteType(this.page.loadData(url[1]));
        this.location(this.page.loadData(url[2]));
        this.siteNotice(this.page.loadData(url[3]));
    }
    activate() {
        return $.when();
    }
}
export = new viewModel();