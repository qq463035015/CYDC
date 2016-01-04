import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idName>{
    onlyMe = ko.observable<boolean>(false);
    queryTime = ko.observable<Date>();

    constructor() {
        super('/api/foodOrder/historyList');
        window['vm'] = this;
        this.query();
    }

    query() {
        this.searchParams({ time: this.queryTime(), onlyMe: this.onlyMe() });
        this.loadData();
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();