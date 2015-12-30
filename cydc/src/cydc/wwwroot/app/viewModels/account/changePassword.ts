import api = require('service/api');
import utils = require('service/utils');
import ko = require('knockout');

class viewModel {
    password = ko.observable<string>().extend({
        required: true, 
        minLength: 6
    });
    newPassword = ko.observable<string>().extend({
        required: true,
        minLength: 6
    });
    confirmedPassword = ko.observable<string>().extend({
        equal: this.newPassword
    });

    changePassword() {
        if (utils.checkValid(this)) {
            api.account.changePassword(this.password(), this.newPassword(), this.confirmedPassword()).then(() => {
                alert('密码修改成功。');
                utils.navigateToCallbackOrHome();
            }).fail(xhr => this.requestFailed(xhr));
        }
    }

    requestFailed(xhr: XMLHttpRequest) {
        if (xhr.status == 401) {
            alert('原密码错误');
        } else {
            alert('失败，不知道什么原因，自己想。');
        }
    }
}

export = new viewModel();