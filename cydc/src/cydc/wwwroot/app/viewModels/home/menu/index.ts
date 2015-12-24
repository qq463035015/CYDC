import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idName> {
    allMenu = ko.observableArray();
    details = ko.observable<string>();
    title = ko.observable<string>();
    price = ko.observable<number>();

    constructor() {
        super('/api/foodMenu/list');
        this.loadData();
    }

    add() {
        api.menu.create(this.details(), this.title(), this.price())
            .then(() => this.loadData())
            .then(() => {
                this.title(null);
                this.price(null);
                this.details(null);
            });
    }

    drop(data: idEnbale) {
        utils.confirm('', '确定要删除吗？').then(cs => {
            cs.close();
            return api.menu.delete(data.id);
        }).then(() => this.loadData());
    }

    UpdateEnable(data: idEnbale) {
        api.menu.update(data.id, !data.enabled).then(() => { });
    }
}

interface idEnbale {
    id: number;
    enabled: boolean;
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();