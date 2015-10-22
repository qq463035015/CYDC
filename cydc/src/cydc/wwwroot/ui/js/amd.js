var cydc;
(function (cydc) {
    var ui;
    (function (ui) {
        var amd;
        (function (amd) {
            require.config({
                baseUrl: '/ui/js/',
                urlArgs: 'v=' + new Date().getTime(),
                paths: {
                    'jquery': '/lib/jquery',
                    'knockout': '/lib/knockout',
                    'text': '/lib/text',
                    'durandal': '/lib/durandal',
                    'plugins': '/lib/durandal/plugins',
                    'transitions': '/lib/durandal/transitions',
                    'main': 'main'
                }
            });
            require(['main'], function () { });
        })(amd = ui.amd || (ui.amd = {}));
    })(ui = cydc.ui || (cydc.ui = {}));
})(cydc || (cydc = {}));
//# sourceMappingURL=amd.js.map