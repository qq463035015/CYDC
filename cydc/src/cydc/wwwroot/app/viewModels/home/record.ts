import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import auth = require('service/auth');
import moment = require('moment');

class viewModel extends pager<idName>{
    onlyMe = ko.observable<boolean>(true);
    queryTime = ko.observable<string>(moment().format('YYYY-MM-DD'));
    amount = ko.observable();
    auth = auth;

    constructor() {
        super('/api/foodOrder/historyList');
        api.user.getUserAmount().then(data => {
            this.amount(data);
        });
        this.search();
    }

    search() {
        this.searchParams({ startTime: this.queryTime(), onlyMe: this.onlyMe() });
        this.loadData();
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();