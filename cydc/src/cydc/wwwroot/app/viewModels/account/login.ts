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

    login() {
        if (utils.checkValid(this)) {
            api.account.login(this.userName(), this.password()).then(() => {
                return utils.navigateToCallbackOrHome();
            }).fail(xhr => this.requestFailed(xhr));
        }
    }

    requestFailed(xhr: XMLHttpRequest) {
        if (xhr.status == 400) {
            alert('用户名或密码错误！');
        } else {
            alert('炸了');
        }
    }
}

export = new viewModel();