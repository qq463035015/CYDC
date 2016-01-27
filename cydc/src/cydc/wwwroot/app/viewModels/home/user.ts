import ko = require('knockout');
import api = require('service/api');
import pager = require('service/pager');
import utils = require('service/utils');
class viewModel extends pager<idName>{
    userName = ko.observable<string>();
    userId = ko.observable<string>();
    price = ko.observable<Number>();

    constructor() {
        super("/api/user/list");
        this.loadData();
    }

    addAmount(data: any) {
        api.accountDetails.create(this.userId(), this.price()).then(() => {
            $('#modal-sample').modal('hide');
            utils.confirm('', '添加成功').then(cs => cs.close());
            this.loadData();
            this.price(null);
        });
    }

    saveUserId(data: any) {
        this.userId(data.userId);
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