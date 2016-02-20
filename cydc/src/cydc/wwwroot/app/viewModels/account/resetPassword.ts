import api = require('service/api');
import utils = require('service/utils');
import ko = require('knockout');
import router = require('plugins/router');

class viewModel {
    email = ko.observable<string>();
    password = ko.observable<string>();
    confirmedPassword = ko.observable<string>();
    
    commit() {
        if (utils.checkValid(this)) {
            api.account.resetPassword(this.email(), utils.urlQuery("code"), this.password(), this.confirmedPassword()).then(() => {
                return utils.alert("密码已经重置，请使用新密码进行登录");
            }).then(() => {
                router.navigate("/account/login");
            }).fail((xhr: XMLHttpRequest) => {
                utils.alert(`密码重置失败(${xhr.status})。`);
            });
        }
    }
}

export = new viewModel();