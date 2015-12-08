import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    allLocation = ko.observableArray<idName>();
    name = ko.observable<string>();
    constructor() {
        this.loadList();
    }

    loadList() {
        return api.location.list().then(data => this.allLocation(data));
    }

    drop(data: idName) {
        utils.confirm('', '确定要删除吗？').then(cs => {
            cs.close();
            return api.location.delete(data.id);
        }).then(() => this.loadList());
    }

    add() {
        this.name() && api.location.create(this.name())
            .then(() => this.loadList())
            .then(() => this.name(''));
    }
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();