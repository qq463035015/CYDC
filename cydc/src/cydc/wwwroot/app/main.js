define(["require", "exports", 'durandal/app', 'durandal/viewLocator'], function (require, exports, app, viewLocator) {
    "use strict";
    //system.debug(false);
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
