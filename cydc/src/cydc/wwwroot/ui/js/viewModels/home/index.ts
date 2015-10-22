import ko = require('knockout');
import router = require('plugins/router');

namespace cydc.ui.home.index {
    export class viewModel {
        text = ko.observable();

        activate() {
            return $.when();
        }
    }
}

export = new cydc.ui.home.index.viewModel();