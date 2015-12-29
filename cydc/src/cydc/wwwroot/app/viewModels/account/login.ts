import ko = require('knockout');
import koval = require('knockout.validation');
import api = require('service/api');
import router = require('plugins/router');

class viewModel {
    userName = ko.observable<string>().extend({
        required: true
    });
    password = ko.observable<string>().extend({
        required: true
    });

    constructor() {
    }

    login() {
        if (this.allValid()) {
            api.account.login(this.userName(), this.password()).always(() => {
                router.navigate('/');
            });
        }
    }

    allValid() {
        let errors = koval.group(this);
        if (errors().length > 0) errors.showAllMessages();
        return errors().length == 0;
    }
}

export = new viewModel();