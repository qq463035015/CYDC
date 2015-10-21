//import * as app from 'durandal/app';
//import * as viewLocator from 'durandal/viewLocator';
//import * as system from 'durandal/system';
var cydc;
(function (cydc) {
    var ui;
    (function (ui) {
        var main;
        (function (main) {
            //define('xx', ['durandal/app'], (app) => {
            //    console.log(app);
            //});
            require(['durandal/app'], function (app) {
                console.log(app);
            });
        })(main = ui.main || (ui.main = {}));
    })(ui = cydc.ui || (cydc.ui = {}));
})(cydc || (cydc = {}));
//# sourceMappingURL=main.js.map