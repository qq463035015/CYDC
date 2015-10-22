define(["require", "exports", 'durandal/app', 'durandal/viewLocator', 'durandal/system'], function (require, exports, app, viewLocator, system) {
    var cydc;
    (function (cydc) {
        var ui;
        (function (ui) {
            var main;
            (function (main) {
                system.debug(true);
                app.title = 'NICE';
                app.configurePlugins({
                    router: true,
                    dialog: true,
                    widget: {
                        kinds: ['expander']
                    }
                });
                app.start().then(function () {
                    viewLocator.useConvention();
                    app.setRoot('viewModels/shell');
                });
            })(main = ui.main || (ui.main = {}));
        })(ui = cydc.ui || (cydc.ui = {}));
    })(cydc || (cydc = {}));
});
//# sourceMappingURL=main.js.map