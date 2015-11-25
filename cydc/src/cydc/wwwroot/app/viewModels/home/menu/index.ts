import ko = require('knockout');
import router = require('plugins/router');

class viewModel {
    menu = ko.observableArray();

    constructor() {
        window['vm'] = this;
        var params = { page: 1, pageSize: 12, asc: false, orderBy: null };
        $.post('/api/foodMenu/list', params).then(data => { this.menu(data);});
        console.log(this.menu());
    }
    activate() {
        return $.when();
    }
}

export = new viewModel();