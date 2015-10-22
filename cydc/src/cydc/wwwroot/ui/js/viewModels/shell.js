define(["require", "exports", 'plugins/router'], function (require, exports, router) {
    var viewModel = (function () {
        function viewModel() {
            this.router = router;
        }
        viewModel.prototype.activate = function () {
            router.makeRelative({ moduleId: 'viewModels' });
            router.map([
                { route: ['', 'home/index'], moduleId: 'home/index', title: '今日菜谱', nav: true, },
                { route: 'home/hello', moduleId: 'home/hello', title: '点餐记录', nav: true }
            ]).buildNavigationModel();
            return router.activate({ pushState: true, root: '/ui' });
        };
        ;
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=shell.js.map