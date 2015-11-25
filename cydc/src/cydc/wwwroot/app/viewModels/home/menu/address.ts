import router = require('plugins/router');
import business = require('service/business');

class viewModel {
    location = ko.observableArray();

    constructor() {
    }

    activate() {
        business.location.list().then(data => {
            console.log(data);
        });
        return $.Deferred().resolve();
    }
}
export = new viewModel();