define(["require", "exports", 'service/pager'], function (require, exports, pager) {
    var viewModel = (function () {
        function viewModel() {
            var p = new pager();
        }
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=user.js.map