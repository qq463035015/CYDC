import router = require('plugins/router');

class viewModel {
    router: DurandalRootRouter;

    constructor() {
        window['vm'] = this;
        this.router = router.createChildRouter()
            .makeRelative({
                moduleId: 'viewModels/home/menu',
                fromParent: true
            }).map([
                { route: ['', 'index'], moduleId: 'index', title: '菜谱管理', nav: true },
                { route: 'type', moduleId: 'type', title: '口味管理', nav: true },
                { route: 'address', moduleId: 'address', title: '地点管理', nav: true },
                { route: 'notice', moduleId: 'notice', title: '通知管理', nav: true },
            ]).buildNavigationModel();
    }
}

export = new viewModel();
