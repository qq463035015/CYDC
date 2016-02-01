var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/pager'], function (require, exports, api, ko, utils, pager) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/tasteType/list');
            this.allType = ko.observableArray();
            this.name = ko.observable();
            this.loadData();
        }
        viewModel.prototype.add = function () {
            var _this = this;
            this.name() && api.type.create(this.name()).then(function () {
                return _this.loadData();
            }).then(function () { return _this.name(null); });
        };
        viewModel.prototype.toggleEnabled = function (item) {
            var _this = this;
            api.type.toggleEnable(item.id, !item.enabled).then(function () {
                utils.confirm('', '修改成功！').then(function (cs) {
                    cs.close();
                }).then(function () { return _this.loadData(); });
            });
        };
        viewModel.prototype.drop = function (data) {
            var _this = this;
            return utils.confirm('', '你确定要删除吗？').then(function (cs) {
                cs.close();
                return api.type.delete(data.id);
            }).then(function () { return _this.loadData(); }).fail(function () {
                confirm('该菜谱已经被引用过，不能删除');
            });
        };
        return viewModel;
    })(pager);
    return new viewModel();
});
