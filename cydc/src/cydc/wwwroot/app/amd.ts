require.config({
    baseUrl: '/app/',
    urlArgs: 'v=' + new Date().getTime(), 
    paths: {
        jquery: '/lib/jquery',
        knockout: '/lib/knockout',
        bootstrap: '/lib/bootstrap',
        text: '/lib/text',
        durandal: '/lib/durandal',
        plugins: '/lib/durandal/plugins',
        transitions: '/lib/durandal/transitions',

        main: 'main'
    }, 
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['main', 'knockout', 'jquery', 'bootstrap'], () => { });