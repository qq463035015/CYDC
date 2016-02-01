import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

class viewModel extends pager<idEnable> {
    allLocation = ko.observableArray<idEnable>();
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

    toggleEnable(item: idEnable) {
        return api.location.toggleEnable(item.id, !item.enabled).then(() => {
            this.loadData();
            return utils.confirm('', '修改成功！');
        }).then(cs => cs.close());
    }

    drop(data: idEnable) {
        utils.confirm('', '确定要删除吗？').then(cs => {
            cs.close();
            return api.location.delete(data.id);
        }).then(() => this.loadData()).fail(() => {
            confirm('该菜谱已经被引用过，不能删除');
        });
    }
}

interface idEnable {
    id: number;
    enabled: boolean;
    name: string;
}

export = new viewModel();