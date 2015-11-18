require.config({
    baseUrl: '/app/',
    urlArgs: 'v=' + new Date().getTime(),
    paths: {
        'jquery': '/lib/jquery',
        'knockout': '/lib/knockout',
        'text': '/lib/text',
        'durandal': '/lib/durandal',
        'plugins': '/lib/durandal/plugins',
        'transitions': '/lib/durandal/transitions',

        'service/pager': 'service/pager', 

        'main': 'main'
    }
});

require(['main'], () => { });