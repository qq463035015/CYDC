﻿import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import auth = require('service/auth');
import moment = require('moment');

class viewModel {
    allMenu = ko.observableArray();
    allLocation = ko.observableArray<any>();
    allFoodType = ko.observableArray<any>();
    locationId = ko.observable<any>(localStorage['locationId'] || null);
    foodTypeId = ko.observable<any>(localStorage['foodTypeId'] || null);
    menuTypeId = ko.observable<any>();
    comment = ko.observable<any>();
    notices = ko.observable<string>();
    noData = ko.observable<boolean>(true);
    foodOrder = new foodOrders();

    menu = ko.pureComputed({
        read: () => {
            return ko.utils.arrayFilter(this.allMenu(), (item: any) => {
                return this.menuTypeId() == item.id;
            });
        }
    });

    loadData() {
        api.menu.enableList().then(data=> {
            this.allMenu(data);
            this.menuTypeId(data[0] && data[0].id)
        }).fail(() => this.noData(false));
        api.type.tasteTypeDropdownList().then(data=> this.allFoodType(data));
        api.location.locationDropdownList().then(data=> this.allLocation(data));
        api.notice.getSiteNotice().then(data=> this.notices(data));
    }

    constructor() {
        this.loadData();
    }

    idName(arr: Array<any>, id): any {
        return ko.utils.arrayFilter(arr, (item: any) => {
            if (item.id == id)
                return item;
        });
    }

    commit() {
        this.foodOrder.details(this.menu()[0].details);
        this.foodOrder.title(this.menu()[0].title);
        this.foodOrder.price(this.menu()[0].price);
        this.foodOrder.type(this.idName(this.allFoodType(), this.foodTypeId())[0].name);
        this.foodOrder.location(this.idName(this.allLocation(), this.locationId())[0].name);
        this.foodOrder.comment(this.comment());
    }

    commitOrder() {
        if (auth.authed()) {
            let now = moment().format('YYYY-MM-DD HH:mm:ss');
            let morning = moment().format('YYYY-MM-DD 10:30:00');
            let afternoon = moment().format('YYYY-MM-DD 24:00:00');
            if (!((now < morning) || (now > morning && now < afternoon))) {
                utils.confirm('', '超过点餐时间,请联系管理员！').then(cs=> cs.close());
                $('#modal-sample').modal('hide');
                return null;
            }
            $('#modal-sample').modal('hide');
            api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment()).then(() => {
                $('#modal-sample').modal('hide');
                localStorage.setItem('locationId', this.locationId());
                localStorage.setItem('foodTypeId', this.foodTypeId());
                this.comment(null);
                location.href = '/home/record';
            }).fail(() => {
                utils.confirm('', '点餐失败！').then(cs => {
                    cs.close();
                });
            });
        }
        else {
            location.href = '/account/login';
        }
    }
}

class foodOrders {
    details = ko.observable();
    title = ko.observable();
    type = ko.observable();
    location = ko.observable();
    price = ko.observable();
    comment = ko.observable();
}
export = new viewModel();