import ko = require('knockout');
import router = require('plugins/router');

class viewModel {
    location = ko.observableArray();

    constructor() {
        var params = { page: 1, pageSize: 12, asc: false, orderBy: null };
        $.post('/api/location/list', params).then(data => { this.location(data); console.log(data); });
        console.log(this.location());
    }
    activate() {
        return $.when();
    }
}
export = new viewModel();