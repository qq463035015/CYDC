import router = require('plugins/router');
import composition = require('durandal/composition');
import ko = require('knockout');

class viewModel {
    router = router;
    activate() {
        router.makeRelative({ moduleId: 'viewModels' });
        router.map([
            { route: ['', 'home/index'], moduleId: 'home/index', title: '首页', nav: true, }, 
            { route: 'home/record', moduleId: 'home/record', title: '点餐记录', nav: true }

        ]).buildNavigationModel();
        return router.activate({ pushState: true, root: '/ui' });
    };
}

export = new viewModel();