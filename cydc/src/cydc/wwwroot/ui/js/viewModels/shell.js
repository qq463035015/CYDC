define(["require", "exports", 'plugins/router'], function (require, exports, router) {
    var viewModel = (function () {
        function viewModel() {
            this.router = router;
        }
        viewModel.prototype.activate = function () {
            router.makeRelative({ moduleId: 'viewModels' });
            router.map([
                { route: ['', 'home/index'], moduleId: 'home/index', title: '首页', nav: true, },
                { route: 'home/record', moduleId: 'home/record', title: '点餐记录', nav: true },
                { route: 'home/user', moduleId: 'home/user', title: '用户管理', nav: true },
                { route: 'home/menu', moduleId: 'home/menu', title: '菜谱管理', nav: true },
                { route: 'home/order', moduleId: 'home/order', title: '点餐列表', nav: true },
                { route: 'home/login', moduleId: 'home/login', title: '登录', nav: true }
            ]).buildNavigationModel();
            return router.activate({ pushState: true, root: '/ui' });
        };
        ;
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=shell.js.map