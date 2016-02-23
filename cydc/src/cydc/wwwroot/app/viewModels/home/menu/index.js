var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/pager'], function (require, exports, api, ko, utils, pager) {
    "use strict";
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/foodMenu/list');
            this.allMenu = ko.observableArray();
            this.details = ko.observable();
            this.title = ko.observable();
            this.price = ko.observable();
            this.loadData();
        }
        viewModel.prototype.add = function () {
            var _this = this;
            api.menu.create(this.details(), this.title(), this.price())
                .then(function () { return _this.loadData(); })
                .then(function () {
                _this.title(null);
                _this.price(null);
                _this.details(null);
            });
        };
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('确定要删除吗？').then(function (cs) {
                cs.close();
                return api.menu.delete(data.id);
            }).then(function () { return _this.loadData(); }).fail(function () {
                utils.alert('该菜谱已经被引用过，不能删除');
            });
        };
        viewModel.prototype.toggleEnable = function (data) {
            var _this = this;
            api.menu.update(data.id, !data.enabled).then(function () {
                utils.alert('修改成功！');
                _this.loadData();
            });
        };
        return viewModel;
    }(pager));
    return new viewModel();
});
