define(["require", "exports", 'plugins/router', 'knockout'], function (require, exports, router, ko) {
    var cydc;
    (function (cydc) {
        var ui;
        (function (ui) {
            var entry;
            (function (entry) {
                var viewModel = (function () {
                    function viewModel() {
                        this.nice = ko.observable();
                        this.router = router;
                    }
                    viewModel.prototype.activate = function () {
                        router.makeRelative({ moduleId: 'viewModels' });
                        router.map([
                            { route: ['', 'home/index'], moduleId: 'home/index', title: 'home', nav: true, hash: '#home/index' }
                        ]).buildNavigationModel();
                        return router.activate();
                    };
                    ;
                    return viewModel;
                })();
                entry.viewModel = viewModel;
            })(entry = ui.entry || (ui.entry = {}));
        })(ui = cydc.ui || (cydc.ui = {}));
    })(cydc || (cydc = {}));
    return new cydc.ui.entry.viewModel();
});
//# sourceMappingURL=entry.js.map