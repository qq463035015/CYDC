import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    allType = ko.observableArray<idName>();
    name = ko.observable<string>();
    constructor() {
        api.type.list().then(data=> this.allType(data));
    }

    add() {
        api.type.create(this.name()).then(() => { });
    }

    drop(data: idName) {
        utils.confirm('', '你确定要删除吗？').then(() => {
            return api.type.delete(data.id);
        });
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();