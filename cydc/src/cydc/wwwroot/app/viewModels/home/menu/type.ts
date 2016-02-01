import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');

interface data extends idName {
    enabled: boolean;
}

class viewModel extends pager<data> {
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

    toggleEnabled(item: data) {
        api.type.toggleEnable(item.id, !item.enabled).then(() => {
            utils.confirm('', '修改成功！').then(cs => {
                cs.close();
            }).then(() => this.loadData());
        });
    }

    drop(data: data) {
        return utils.confirm('', '你确定要删除吗？').then(cs => {
            cs.close();
            return api.type.delete(data.id);
        }).then(() => this.loadData()).fail(() => {
            confirm('该菜谱已经被引用过，不能删除');
        });
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();