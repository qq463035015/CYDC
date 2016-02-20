require.config({
    baseUrl: '/app/',
    //urlArgs: 'v=' + new Date().getTime(), 
    urlArgs: 'v=20160221a',
    paths: {
        jquery: '/lib/jquery',
        knockout: '/lib/knockout',
        bootstrap: '/lib/bootstrap',
        text: '/lib/text',
        durandal: '/lib/durandal',
        plugins: '/lib/durandal/plugins',
        transitions: '/lib/durandal/transitions',
        "knockout.validation": '/lib/knockout.validation',
        kovalcn: '/lib/knockout.validation.zh-CN',
        signalr: '/lib/jquery.signalR',
        moment: '/lib/moment',
        main: 'main'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        signalr: {
            deps: ['jquery']
        }
    }
});
require([
    'knockout.validation',
    'kovalcn',
    'main',
    'knockout',
    'jquery',
    'bootstrap',
    'service/ko_bindings',
    'signalr'], function (koval) {
    koval.locale('zh-CN');
});
