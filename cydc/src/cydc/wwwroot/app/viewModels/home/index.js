define(["require", "exports", 'service/api', 'knockout'], function (require, exports, api, ko) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allMenu = ko.observableArray();
            this.allLocation = ko.observableArray();
            this.allFoodType = ko.observableArray();
            this.location = ko.observable();
            this.foodType = ko.observable();
            this.type = ko.observable();
            this.menu = ko.pureComputed({
                read: function () {
                    return ko.utils.arrayFilter(_this.allMenu(), function (item) {
                        return _this.type() == item.id;
                    });
                }
            });
            window["vm"] = this;
            this.loadData();
        }
        viewModel.prototype.loadData = function () {
            var _this = this;
            api.menu.list().then(function (data) {
                _this.allMenu(data);
                _this.type(data[0].id);
            });
            api.type.tasteTypeDDl().then(function (data) { return _this.allFoodType(data); });
            api.location.locationDDl().then(function (data) { return _this.allLocation(data); });
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=index.js.map