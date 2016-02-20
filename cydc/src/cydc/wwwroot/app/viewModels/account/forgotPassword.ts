import api = require('service/api');
import utils = require('service/utils');
import ko = require('knockout');
import router = require('plugins/router');

class viewModel {
    email = ko.observable<string>();
    
    commit() {
        if (utils.checkValid(this)) {
            api.account.forgotPassword(this.email()).then(() => {
                return utils.alert(`如果您输入的邮箱正确，请前往你的邮箱${this.email()}查看。`);
            }).then(() => {
                router.navigate("/");
            }).fail((xhr: XMLHttpRequest) => {
                utils.alert(`发送重置密码邮件失败(${xhr.status})。`)
            });
        }
    }
}

export = new viewModel();