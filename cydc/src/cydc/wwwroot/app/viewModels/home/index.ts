import router = require('plugins/router');
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
    foodOrder = new foodOrders();
    auth = auth;
    
    menu = ko.pureComputed(() => this.allMenu().filter(x => this.menuTypeId() == x.id)[0]);

    loadData() {
        api.menu.enableList().then(data=> {
            this.allMenu(data);
            this.menuTypeId(data[0] && data[0].id)
        });
        api.type.enabledTasteTypes().then(data=> this.allFoodType(data));
        api.location.enabledLocationList().then(data=> this.allLocation(data));
        api.notice.getSiteNotice().then(data=> this.notices(data));
    }

    constructor() {
        this.loadData();
        console.log(this);
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
            let afternoon = moment().format('YYYY-MM-DD 17:30:00');
            if (!((now < morning) || (now > morning && now < afternoon))) {
                this.tips();
            }
            api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment()).then(() => {
                $('#modal-sample').modal('hide');
                this.setCookie();
                this.comment(null);

                router.navigate('/home/record', { replace: true, trigger: true });
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

    tips() {
        utils.alert('超过点餐时间,请联系管理员！');
        $('#modal-sample').modal('hide');
        return null;
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