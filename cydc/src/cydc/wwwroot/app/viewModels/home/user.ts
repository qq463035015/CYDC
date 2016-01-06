import ko = require('knockout');
import api = require('service/api');

class viewModel {
    list = ko.observableArray<Object>();
    price = ko.observable<Number>();

    constructor() {
        api.user.list().then(data => this.list(data));
    }

    addAmount() {
    }
}

export = new viewModel();