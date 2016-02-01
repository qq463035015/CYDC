define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/auth', 'moment'], function (require, exports, api, ko, utils, auth, moment) {
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
            this.noData = ko.observable(true);
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
            }).fail(function () { return _this.noData(false); });
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
            this.foodOrder.details(this.menu()[0].details);
            this.foodOrder.title(this.menu()[0].title);
            this.foodOrder.price(this.menu()[0].price);
            this.foodOrder.type(this.idName(this.allFoodType(), this.foodTypeId())[0].name);
            this.foodOrder.location(this.idName(this.allLocation(), this.locationId())[0].name);
            this.foodOrder.comment(this.comment());
        };
        viewModel.prototype.commitOrder = function () {
            var _this = this;
            if (auth.authed()) {
                var now = moment().format('YYYY-MM-DD HH:mm:ss');
                var morning = moment().format('YYYY-MM-DD 10:30:00');
                var afternoon = moment().format('YYYY-MM-DD 24:00:00');
                if (!((now < morning) || (now > morning && now < afternoon))) {
                    utils.confirm('', '超过点餐时间,请联系管理员！').then(function (cs) { return cs.close(); });
                    $('#modal-sample').modal('hide');
                    return null;
                }
                $('#modal-sample').modal('hide');
                api.order.create(this.menuTypeId(), this.locationId(), this.foodTypeId(), this.comment()).then(function () {
                    $('#modal-sample').modal('hide');
                    localStorage.setItem('locationId', _this.locationId());
                    localStorage.setItem('foodTypeId', _this.foodTypeId());
                    _this.comment(null);
                    location.href = '/home/record';
                }).fail(function () {
                    utils.confirm('', '点餐失败！').then(function (cs) {
                        cs.close();
                    });
                });
            }
            else {
                location.href = '/account/login';
            }
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
