import router = require('plugins/router');
import composition = require('durandal/composition');
import ko = require('knockout');

namespace cydc.ui.entry {
    export class viewModel {
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
}
export = new cydc.ui.entry.viewModel();