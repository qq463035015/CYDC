import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import kob = require('service/ko_bindings');

class viewModel extends pager<idName>{
    userName = ko.observable<string>();

    constructor() {
        super('/api/accountDetails/list');
        this.loadData();
    }

    search() {
        this.searchParams({ userName: this.userName() });
        this.loadData();
    }

    viewFoodOrder(data) {
        utils.alert(`订单 #${data.foodOrderId}`, `
用户名：${data.foodOrder.orderUser.userName} <br/>
点餐时间：${kob.dateTimeText(data.foodOrder.orderTime)} <br/>
金额：${kob.dateTimeText(data.foodOrder.amount)} <br/>
备注：${data.foodOrder.comment || '无'} <br/>`);
    }
}

interface idName {
    id: string;
    name: string;
}

export = new viewModel();