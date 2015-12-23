import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idName> {
    allType = ko.observableArray<idName>();
    name = ko.observable<string>();

    constructor() {
        super('/api/tasteType/list')
        this.loadData();
    }

    add() {
        this.name() && api.type.create(this.name()).then(() => {
            return this.loadData();
        }).then(() => this.name(null));
    }

    drop(data: idName) {
        return utils.confirm('', '你确定要删除吗？').then(cs => {
            cs.close();
            return api.type.delete(data.id);
        }).then(() => this.loadData());
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();