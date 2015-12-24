import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');


class viewModel {
    allMenu = ko.observableArray();
    allLocation = ko.observableArray<any>();
    allFoodType = ko.observableArray<any>();
    locationId = ko.observable<any>();
    foodTypeId = ko.observable<any>();
    menuTypeId = ko.observable();
    comment = ko.observable();

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
            this.menuTypeId(data[0].id)
        });
        api.type.tasteTypeDDl().then(data=> this.allFoodType(data));
        api.location.locationDDl().then(data=> this.allLocation(data));
    }

    constructor() {
        window["vm"] = this;
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