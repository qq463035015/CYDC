import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    allType = ko.observableArray<idName>();
    name = ko.observable<string>();

    constructor() {
        this.loadList();
    }

    loadList() {
        return api.type.list().then(data=> this.allType(data));
    }

    add() {
        this.name() && api.type.create(this.name()).then(() => {
            return this.loadList();
        }).then(() => this.name(null));
    }

    drop(data: idName) {
        return utils.confirm('', '你确定要删除吗？').then(cs => {
            cs.close();
            return api.type.delete(data.id);
        }).then(() => this.loadList());
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();