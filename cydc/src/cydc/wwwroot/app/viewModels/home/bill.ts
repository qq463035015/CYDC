import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import ko_bindings = require('service/ko_bindings');

class viewModel extends pager<idName>{
    userName = ko.observable<string>();

    constructor() {
        super('/api/accountDetails/list');
        ko_bindings.fuck();
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