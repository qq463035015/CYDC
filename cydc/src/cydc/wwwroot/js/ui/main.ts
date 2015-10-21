//import * as app from 'durandal/app';
//import * as viewLocator from 'durandal/viewLocator';
//import * as system from 'durandal/system';

namespace cydc.ui.main {
    //define('xx', ['durandal/app'], (app) => {
    //    console.log(app);
    //});
    require(['durandal/app'], (app) => {
        console.log(app);
    });
    // system.debug(true);

    //app.title = 'cydc';

    //app.configurePlugins({
    //    router: true, 
    //    dialog: true, 
    //    widget: {
    //        kinds: ['expander']
    //    }
    //});

    //app.start().then(() => {
    //    viewLocator.useConvention();
    //});
}