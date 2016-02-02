import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import auth = require('service/auth');
import ko_bindings = require('service/ko_bindings');

class viewModel extends pager<idName>{
    onlyMe = ko.observable<boolean>(true);
    queryTime = ko.observable<Date>();
    amount = ko.observable();
    auth = auth;

    constructor() {
        super('/api/foodOrder/historyList');
        api.user.getUserAmount().then(data => {
            this.amount(data);
        });
        ko_bindings.fuck();
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