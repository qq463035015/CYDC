var cydc;
(function (cydc) {
    var ui;
    (function (ui) {
        var amd;
        (function (amd) {
            require.config({
                baseUrl: '/js',
                paths: {
                    'jquery': 'lib/jquery',
                    'knockout': 'lib/knockout',
                    'require': 'lib/require',
                    'text': 'lib/text',
                    'durandal': 'lib/durandal',
                    'plugins': 'lib/durandal/plugins',
                    'transitions': 'lib/durandal/transitions'
                }
            });
        })(amd = ui.amd || (ui.amd = {}));
    })(ui = cydc.ui || (cydc.ui = {}));
})(cydc || (cydc = {}));
//# sourceMappingURL=amd.js.map