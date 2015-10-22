import router = require('plugins/router');
import composition = require('durandal/composition');
import ko = require('knockout');

class viewModel {
    router = router;
    activate() {
        router.makeRelative({ moduleId: 'viewModels' });
        router.map([
            { route: ['', 'home/index'], moduleId: 'home/index', title: '今日菜谱', nav: true, }, 
            { route: 'home/hello', moduleId: 'home/hello', title: '点餐记录', nav: true }
        ]).buildNavigationModel();
        return router.activate({ pushState: true, root: '/ui' });
    };
}

export = new viewModel();