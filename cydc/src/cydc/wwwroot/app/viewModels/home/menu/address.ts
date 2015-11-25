import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    allLocation = ko.observableArray<idName>();

    constructor() {
        api.location.list().then(data => this.allLocation(data));
    }

    drop(data: idName) {
        utils.confirm('', '确定要删除吗？').then(() => {
            return api.location.delete(data.id);
        });
    }
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();