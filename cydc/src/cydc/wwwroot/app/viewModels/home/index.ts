import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');


class viewModel {
    allMenu = ko.observableArray();
    allLocation = ko.observableArray();
    allFoodType = ko.observableArray();
    location = ko.observable();
    foodType = ko.observable();

    type = ko.observable();
    menu = ko.pureComputed({
        read: () => {
            return ko.utils.arrayFilter(this.allMenu(), (item: any) => {
                return this.type() == item.id;
            });
        }
    });

    loadData() {
        api.menu.list().then(data=> {
            this.allMenu(data);
            this.type(data[0].id)
        });
        api.type.tasteTypeDDl().then(data=> this.allFoodType(data));
        api.location.locationDDl().then(data=> this.allLocation(data));
    }

    constructor() {
        window["vm"] = this;
        this.loadData();
    }
}

export = new viewModel();