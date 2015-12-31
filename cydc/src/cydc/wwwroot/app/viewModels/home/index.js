define(["require", "exports", 'service/api', 'knockout', 'service/utils'], function (require, exports, api, ko, utils) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allMenu = ko.observableArray();
            this.allLocation = ko.observableArray();
            this.allFoodType = ko.observableArray();
            this.locationId = ko.observable();
            this.foodTypeId = ko.observable();
            this.menuTypeId = ko.observable();
            this.comment = ko.observable();
            this.foodOrder = new foodOrders();
            this.menu = ko.pureComputed({
                read: function () {
                    return ko.utils.arrayFilter(_this.allMenu(), function (item) {
                        return _this.menuTypeId() == item.id;
                    });
                }
            });
            this.loadData();
        }
        viewModel.prototype.loadData = function () {
            var _this = this;
            api.menu.enableList().then(function (data) {
                _this.allMenu(data);
                _this.menuTypeId(data[0] && data[0].id);
            });
            api.type.tasteTypeDropdownList().then(function (data) { return _this.allFoodType(data); });
            api.location.locationDropdownList().then(function (data) { return _this.allLocation(data); });
        };
        viewModel.prototype.idName = function (arr, id) {
            return ko.utils.arrayFilter(arr, function (item) {
                if (item.id == id)
                    return item;
            });
        };
        viewModel.prototype.commit = function () {
            this.foodOrder.details(this.menu()[0].details);
            this.foodOrder.title(this.menu()[0].title);
            this.foodOrder.price(this.menu()[0].price);
            this.foodOrder.type(this.idName(this.allFoodType(), this.foodTypeId())[0].name);
            this.foodOrder.location(this.idName(this.allLocation(), this.locationId())[0].name);
            this.foodOrder.comment(this.comment());
        };
        viewModel.prototype.commitOrder = function () {
            var _this = this;
            api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment()).then(function () {
                $('#modal-sample').modal('hide');
                utils.confirm('', '点餐成功！').then(function (cs) {
                    cs.close();
                }).then(function () {
                    _this.loadData();
                    _this.comment(null);
                });
            });
            api.clientInfo.create().then(function () { });
        };
        return viewModel;
    })();
    var foodOrders = (function () {
        function foodOrders() {
            this.details = ko.observable();
            this.title = ko.observable();
            this.type = ko.observable();
            this.location = ko.observable();
            this.price = ko.observable();
            this.comment = ko.observable();
        }
        return foodOrders;
    })();
    return new viewModel();
});
