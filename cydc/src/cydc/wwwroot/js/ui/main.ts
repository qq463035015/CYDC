﻿import app = require('durandal/app');
import viewLocator = require('durandal/viewLocator');
import system = require('durandal/system');

namespace cydc.ui.main {
    system.debug(true);

    app.title = 'cydc';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: {
            kinds: ['expander']
        }
    });

    app.start().then(() => {
        viewLocator.useConvention();
        app.setRoot('viewModels/shell');
    });
}