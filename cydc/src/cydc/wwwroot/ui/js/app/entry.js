define(["require", "exports", 'plugins/router'], function (require, exports, router) {
    var cydc;
    (function (cydc) {
        var ui;
        (function (ui) {
            var entry;
            (function (entry) {
                var viewModel = (function () {
                    function viewModel() {
                    }
                    viewModel.prototype.activate = function () {
                        router.makeRelative({ moduleId: 'viewModels' });
                        router.guardRoute = function (instance, instruction) {
                            return router.map([
                                { route: ['', 'home/index'], moduleId: 'home/index', title: 'home', nav: true, hash: '#home/index' }
                            ])
                                .buildNavigationModel()
                                .mapUnknownRoutes('notfound', 'notfound')
                                .activate({ pushState: true, root: '/' });
                        };
                    };
                    return viewModel;
                })();
                entry.viewModel = viewModel;
            })(entry = ui.entry || (ui.entry = {}));
        })(ui = cydc.ui || (cydc.ui = {}));
    })(cydc || (cydc = {}));
    return new cydc.ui.entry.viewModel();
});
//# sourceMappingURL=entry.js.map