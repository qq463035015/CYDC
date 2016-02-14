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

    addAmount() {
        if (this.price()) {
            return api.accountDetails.create(this.userId(), this.price()).then(() => {
                $('#modal-sample').modal('hide');
                utils.alert('添加成功');
                this.price(null);
                return this.loadData();
            });
        }
        utils.alert("请输入正确的金额.");
    }

    saveUserId(data: any) {
        this.userId(data.userId);
    }

    search() {
        this.searchParams({ userName: this.userName(), interval: this.amountOfInterval() });
        this.loadData();
    }
}

interface idName {
    id: string;
    name: string;
}

export = new viewModel();