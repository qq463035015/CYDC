﻿import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');

class viewModel {
    notice = ko.observable<idContent>();

    constructor() {
        api.notice.getSiteNotice().then(data=> this.notice(data));
    }

    update() {
        api.notice.update(this.notice().content).then(() => { });
    }
}

interface idContent {
    id: number;
    content: string;
}
export = new viewModel();