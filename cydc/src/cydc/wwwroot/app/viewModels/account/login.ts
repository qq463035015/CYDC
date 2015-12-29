import ko = require('knockout');
import koval = require('knockout.validation');
import api = require('service/api');
import router = require('plugins/router');
import utils = require('service/utils');

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
            api.account.login(this.userName(), this.password()).then(() => {
                router.navigate(utils.urlQuery('returnUrl') || '/');
            }).fail((xhr: XMLHttpRequest) => {
                if (xhr.status == 400) {
                    alert('用户名或密码错误！');
                }
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