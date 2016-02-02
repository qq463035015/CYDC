import ko = require('knockout');
import api = require('service/api');
import pager = require('service/pager');
import utils = require('service/utils');
class viewModel extends pager<idName>{
    userName = ko.observable<string>();
    userId = ko.observable<string>();
    amountOfInterval = ko.observable<Number>();
    price = ko.observable<Number>();

    constructor() {
        super("/api/user/list");
        this.loadData();
    }

    addAmount(data: any) {
        if (this.price()) {
            return api.accountDetails.create(this.userId(), this.price()).then(() => {
                $('#modal-sample').modal('hide');
                utils.confirm('添加成功');
                this.loadData();
                this.price(null);
            });
        }
        confirm("请输入正确的金额.");
    }

    saveUserId(data: any) {
        this.userId(data.userId);
    }

    query() {
        this.searchParams({ userName: this.userName(), interval: this.amountOfInterval() });
        this.loadData();
    }
}

interface idName {
    id: string;
    name: string;
}

export = new viewModel();