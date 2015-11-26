import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    notice = ko.observable<string>();
    constructor() {
        api.notice.list().then(data => this.notice(data[0].content));
    }

    update(data: idName) {
        api.notice.update(data.id, this.notice()).then(() => { location.reload(); });
    }
}

interface idName {
    id: number;
    name: string;
}
export = new viewModel();