import pager = require('service/pager');

class viewModel extends pager<idName> {
    constructor() {
        super("");
    }
}

interface idName {
    id: string;
    name: string;
}

export = new viewModel();