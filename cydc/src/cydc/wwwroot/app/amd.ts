require.config({
    baseUrl: '/app/',
    //urlArgs: 'v=' + new Date().getTime(), 
    urlArgs: 'v=2015-12-29-a',
    paths: {
        jquery: '/lib/jquery',
        knockout: '/lib/knockout',
        bootstrap: '/lib/bootstrap',
        text: '/lib/text',
        durandal: '/lib/durandal',
        plugins: '/lib/durandal/plugins',
        transitions: '/lib/durandal/transitions',
        "knockout.validation": '/lib/knockout.validation',

        main: 'main'
    }, 
    shim: {
        bootstrap: {
            deps: ['jquery']
        }, 
        "knockout.validation": {
            deps: ['knockout']
        }
    }
});

require(['main', 'knockout', 'jquery', 'bootstrap', 'knockout.validation'], () => { });