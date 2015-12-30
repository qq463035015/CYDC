import ko = require('knockout');
import koval = require('knockout.validation');
import api = require('service/api');
import utils = require('service/utils');

class viewModel {
    email = ko.observable<string>().extend({
        email: true,
        required: true,
        validation: [
            {
                async: true,
                validator: (val: string, newval: string, callback: (boolean) => void) => {
                    return api.account.checkEmail(val)
                        .then(result => callback(result));
                },
                message: '此字段有重复'
            }
        ]
    });
    username = ko.observable<string>().extend({
        minLength: 2,
        required: true,
        validation: [
            {
                validator: (characters: string) => /^[\u4e00-\u9fcc]+$/g.test(characters),
                message: '必须输入中文'
            },
            {
                async: true,
                validator: (val: string, newval: string, callback: (boolean) => void) => {
                    return api.account.checkUserName(val)
                        .then(result => callback(result));
                },
                message: '此字段有重复'
            }
        ]
    });
    password = ko.observable<string>().extend({
        minLength: 6,
        required: true
    });
    confirmedPassword = ko.observable<string>().extend({
        equal: this.password
    });

    register() {
        if (utils.checkValid(this)) {
            return api.account.register(this.email(), this.username(), this.password(), this.confirmedPassword()).then(() => {
                utils.navigateToCallbackOrHome();
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