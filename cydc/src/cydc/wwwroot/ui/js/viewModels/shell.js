define(["require", "exports", 'plugins/router', 'knockout'], function (require, exports, router, ko) {
    var viewModel = (function () {
        function viewModel() {
            this.nice = ko.observable();
            this.router = router;
        }
        viewModel.prototype.activate = function () {
            router.makeRelative({ moduleId: 'viewModels' });
            router.map([
                { route: ['', 'home/index'], moduleId: 'home/index', title: 'home', nav: true, },
                { route: 'home/hello', moduleId: 'home/hello', title: 'hello', nav: true }
            ]).buildNavigationModel();
            return router.activate({ pushState: true, root: '/ui' });
        };
        ;
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=shell.js.map