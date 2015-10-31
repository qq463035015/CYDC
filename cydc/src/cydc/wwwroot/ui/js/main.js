define(["require", "exports", 'durandal/app', 'durandal/viewLocator', 'durandal/system'], function (require, exports, app, viewLocator, system) {
    system.debug(true);
    app.title = '';
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
});
//# sourceMappingURL=main.js.map