require.config({
    baseUrl: '/app/',
    urlArgs: 'v=' + new Date().getTime(), 
    //urlArgs: 'v=2015-12-29-d',
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

        main: 'main'
    }, 
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['knockout.validation', 'kovalcn', 'main', 'knockout', 'jquery', 'bootstrap', ], (koval: KnockoutValidationStatic) => {
    koval.locale('zh-CN');
});