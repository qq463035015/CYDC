var cydc;
(function (cydc) {
    var ui;
    (function (ui) {
        var amd;
        (function (amd) {
            var jquery = 'jquery';
            var ko = 'ko';
            var bootstrap = 'bootstrap';
            require.config({
                baseUrl: '/js',
                paths: (_a = {},
                    _a[jquery] = 'lib/jquery',
                    _a[ko] = 'lib/knockout',
                    _a[bootstrap] = 'lib/bootstrap',
                    _a
                )
            });
            var _a;
        })(amd = ui.amd || (ui.amd = {}));
    })(ui = cydc.ui || (cydc.ui = {}));
})(cydc || (cydc = {}));
