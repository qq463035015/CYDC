define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var cydc;
    (function (cydc) {
        var ui;
        (function (ui) {
            var home;
            (function (home) {
                var index;
                (function (index) {
                    var viewModel = (function () {
                        function viewModel() {
                            this.text = ko.observable();
                        }
                        viewModel.prototype.activate = function () {
                            return $.when();
                        };
                        return viewModel;
                    })();
                    index.viewModel = viewModel;
                })(index = home.index || (home.index = {}));
            })(home = ui.home || (ui.home = {}));
        })(ui = cydc.ui || (cydc.ui = {}));
    })(cydc || (cydc = {}));
    return new cydc.ui.home.index.viewModel();
});
//# sourceMappingURL=index.js.map