import ko = require('knockout');
import router = require('plugins/router');

class viewModel {
    text = ko.observable();

    activate() {
        return $.when();
    }
}

export = new viewModel();