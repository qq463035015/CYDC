﻿import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import auth = require('service/auth');
import moment = require('moment');

class viewModel {
    allMenu = ko.observableArray<foodMenu>();
    allLocation = ko.observableArray<any>();
    allFoodType = ko.observableArray<any>();
    locationId = ko.observable<any>(localStorage['locationId'] || null);
    foodTypeId = ko.observable<any>(localStorage['foodTypeId'] || null);
    menuTypeId = ko.observable<any>();
    comment = ko.observable<any>();
    notices = ko.observable<string>();
    name = ko.observable<string>();
    canSumbit = ko.observable(true);
    foodOrder = new foodOrders();
    auth = auth;

    menu: any = ko.pureComputed(() => this.allMenu().filter(x => this.menuTypeId() == x.id)[0]);

    loadData() {
        api.menu.enableList().then(data=> {
            this.allMenu(data);
            this.menuTypeId(data[0] && data[0].id)
            if (data.length == 0) this.canSumbit(false);
        });
        api.type.enabledTasteTypes().then(data=> this.allFoodType(data));
        api.location.enabledLocationList().then(data=> this.allLocation(data));
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
        this.foodOrder.details(this.menu().details);
        this.foodOrder.title(this.menu().title);
        this.foodOrder.price(this.menu().price);
        this.foodOrder.type(this.idName(this.allFoodType(), this.foodTypeId())[0].name);
        this.foodOrder.location(this.idName(this.allLocation(), this.locationId())[0].name);
        this.foodOrder.comment(this.comment());
    }

    commitOrder() {
        if (auth.authed()) {
            api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment(), this.name()).then(() => {
                $('#modal-sample').modal('hide');
                this.setCookie();
                this.comment(null);
                location.href = "/home/record";
            }).fail(() => {
                utils.alert('点餐失败！');
            });
        }
        else {
            router.navigate('/account/login', { replace: true, trigger: true });
        }
    }

    setCookie() {
        localStorage.setItem('locationId', this.locationId());
        localStorage.setItem('foodTypeId', this.foodTypeId());
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

interface foodMenu {
    id: number,
    details: string
}