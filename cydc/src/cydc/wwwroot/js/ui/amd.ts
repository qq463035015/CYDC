﻿namespace cydc.ui.amd {
    require.config({
        baseUrl: '/js',
        urlArgs: 'v=1', 
        paths: {
            'jquery': 'lib/jquery', 
            'knockout': 'lib/knockout', 
            'text': 'lib/text', 
            'durandal': 'lib/durandal', 
            'plugins': 'lib/durandal/plugins', 
            'transitions': 'lib/durandal/transitions', 

            'main': 'ui/main'
        }
    });

    require(['main'], () => { });
}