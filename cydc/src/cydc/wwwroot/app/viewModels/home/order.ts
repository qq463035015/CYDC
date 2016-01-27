import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import ko_bindings = require('service/ko_bindings');

class viewModel extends pager<idName> {
    queryTime = ko.observable();
    userName = ko.observable();

    constructor() {
        super('/api/foodOrder/list');
        ko_bindings.fuck();
        this.loadData();
    }

    drop(data) {
        utils.confirm('', '确定要退订吗？').then(cs=> {
            cs.close();
            return api.order.delete(data.id);
        }).then(() => {
            this.loadData();
            utils.confirm('退订成功！', '').then(cs=> {
                cs.close();
            });
        });
    }

    query() {
        this.searchParams({ time: this.queryTime(), userName: this.userName() });
        this.loadData();
    }
    
    exportExcel() {
        console.log(1);
    }
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();