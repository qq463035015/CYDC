import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    allMenu = ko.observableArray();
    details = ko.observable<string>();
    title = ko.observable<string>();
    price = ko.observable<number>();
    constructor() {
        api.menu.list().then(data=> this.allMenu(data));
    }

    add() {
        api.menu.Install(this.details(), this.title(), this.price()).then(() => { location.reload(); });
    }

    drop(data: idEnbale) {
        utils.confirm('', '确定要删除吗？').then(() => {
            return api.menu.delete(data.id);
        });
    }

    update(data: idEnbale) {
        api.menu.update(data.id, data.enable).then(() => { location.reload(); });
    }
}

interface idEnbale {
    id: number;
    enable: boolean;
}

export = new viewModel();