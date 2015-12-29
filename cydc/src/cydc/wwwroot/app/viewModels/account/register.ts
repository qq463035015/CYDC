import ko = require('knockout');
import koval = require('knockout.validation');
import api = require('service/api');
import utils = require('service/utils');

class viewModel {
    email = ko.observable<string>().extend({
        email: true,
        required: true
    });
    username = ko.observable<string>().extend({
        minLength: 2,
        required: true,
        validation: [
            {
                validator(characters: string) {
                    return characters.split("").every(c => 19968 <= c.charCodeAt(0) && c.charCodeAt(0) <= 40908);
                }, 
                message: '必须输入中文'
            }
        ]
    });
    password = ko.observable<string>().extend({
        minLength: 6,
        required: true
    });
    confirmedPassword = ko.observable<string>().extend({
    });

    register() {
        if (utils.checkValid(this)) {
            return api.account.register(this.email(), this.username(), this.password(), this.confirmedPassword()).then(() => {
                utils.redirectToCallbackOrHome();
            }).fail(xhr => this.requestFailed(xhr));
        }
    }

    requestFailed(xhr: XMLHttpRequest) {
        if (xhr.status == 400) {
            alert('有问题');
        }
    }
}

export = new viewModel();