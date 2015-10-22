﻿import router = require('plugins/router');
import composition = require('durandal/composition');
import ko = require('knockout');

class viewModel {
    nice = ko.observable();

    router = router;

    activate() {
        router.makeRelative({ moduleId: 'viewModels' });
        router.map([
            { route: ['', 'home/index'], moduleId: 'home/index', title: 'home', nav: true, hash: '#home/index' }
        ]).buildNavigationModel();
        return router.activate();
    };
}

export = new viewModel();