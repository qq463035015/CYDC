import router = require('plugins/router');
import composition = require('durandal/composition');

namespace cydc.ui.entry {
    export class viewModel {
        activate() {
            router.makeRelative({ moduleId: 'viewModels' });
            router.guardRoute = (instance, instruction) => {
                return router.map([
                    { route: ['', 'home/index'], moduleId: 'home/index', title: 'home', nav: true, hash: '#home/index' }
                ])
                    .buildNavigationModel()
                    .mapUnknownRoutes('notfound', 'notfound')
                    .activate({ pushState: true, root: '/' });
            };
        }
    }
}

export = new cydc.ui.entry.viewModel();