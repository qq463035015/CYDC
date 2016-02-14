import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idName>{
    userName = ko.observable<string>();

    constructor() {
        super('/api/accountDetails/list');
        this.loadData();
    }

    query() {
        this.searchParams({ userName: this.userName() });
        this.loadData();
    }
}

interface idName {
    id: string;
    name: string;
}

export = new viewModel();