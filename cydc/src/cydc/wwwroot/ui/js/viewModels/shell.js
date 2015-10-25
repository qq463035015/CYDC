define(["require", "exports", 'plugins/router'], function (require, exports, router) {
    var viewModel = (function () {
        function viewModel() {
            this.router = router;
        }
        viewModel.prototype.activate = function () {
            router.makeRelative({ moduleId: 'viewModels' });
            router.map([
                { route: ['', 'home/index'], moduleId: 'home/index', title: '首页', nav: true, },
                { route: 'home/record', moduleId: 'home/record', title: '点餐记录', nav: true }
            ]).buildNavigationModel();
            return router.activate({ pushState: true, root: '/ui' });
        };
        ;
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=shell.js.map