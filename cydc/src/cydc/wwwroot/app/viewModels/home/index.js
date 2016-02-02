define(["require", "exports", 'plugins/router', 'service/api', 'knockout', 'service/utils', 'service/auth'], function (require, exports, router, api, ko, utils, auth) {
    var viewModel = (function () {
        function viewModel() {
            var _this = this;
            this.allMenu = ko.observableArray();
            this.allLocation = ko.observableArray();
            this.allFoodType = ko.observableArray();
            this.locationId = ko.observable(localStorage['locationId'] || null);
            this.foodTypeId = ko.observable(localStorage['foodTypeId'] || null);
            this.menuTypeId = ko.observable();
            this.comment = ko.observable();
            this.notices = ko.observable();
            this.foodOrder = new foodOrders();
            this.auth = auth;
            this.menu = ko.pureComputed(function () { return _this.allMenu().filter(function (x) { return _this.menuTypeId() == x.id; })[0]; });
            this.loadData();
        }
        viewModel.prototype.loadData = function () {
            var _this = this;
            api.menu.enableList().then(function (data) {
                _this.allMenu(data);
                _this.menuTypeId(data[0] && data[0].id);
            });
            api.type.enabledTasteTypes().then(function (data) { return _this.allFoodType(data); });
            api.location.enabledLocationList().then(function (data) { return _this.allLocation(data); });
            api.notice.getSiteNotice().then(function (data) { return _this.notices(data); });
        };
        viewModel.prototype.idName = function (arr, id) {
            return ko.utils.arrayFilter(arr, function (item) {
                if (item.id == id)
                    return item;
            });
        };
        viewModel.prototype.commit = function () {
            this.foodOrder.details(this.menu().details);
            this.foodOrder.title(this.menu().title);
            this.foodOrder.price(this.menu().price);
            this.foodOrder.type(this.idName(this.allFoodType(), this.foodTypeId())[0].name);
            this.foodOrder.location(this.idName(this.allLocation(), this.locationId())[0].name);
            this.foodOrder.comment(this.comment());
        };
        viewModel.prototype.commitOrder = function () {
            var _this = this;
            if (auth.authed()) {
                api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment()).then(function () {
                    $('#modal-sample').modal('hide');
                    _this.setCookie();
                    _this.comment(null);
                    location.href = "/home/record";
                }).fail(function () {
                    utils.alert('点餐失败！');
                });
            }
            else {
                router.navigate('/account/login', { replace: true, trigger: true });
            }
        };
        viewModel.prototype.setCookie = function () {
            localStorage.setItem('locationId', this.locationId());
            localStorage.setItem('foodTypeId', this.foodTypeId());
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
