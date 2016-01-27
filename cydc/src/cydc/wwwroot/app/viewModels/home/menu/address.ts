import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idName> {
    allLocation = ko.observableArray<idName>();
    name = ko.observable<string>();
    constructor() {
        super('/api/location/list');
        this.loadData();
    }

    add() {
        this.name() && api.location.create(this.name())
            .then(() => this.loadData())
            .then(() => this.name(''));
    }

    drop(data: idName) {
        utils.confirm('', '确定要删除吗？').then(cs => {
            cs.close();
            return api.location.delete(data.id);
        }).then(() => this.loadData());
    }
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();