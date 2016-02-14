var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'service/api', 'knockout', 'service/utils', 'service/pager', 'moment'], function (require, exports, api, ko, utils, pager, moment) {
    var viewModel = (function (_super) {
        __extends(viewModel, _super);
        function viewModel() {
            _super.call(this, '/api/foodOrder/list');
            this.queryTime = ko.observable(moment().format('YYYY-MM-DD'));
            this.userName = ko.observable();
            this.id = ko.observable();
            this.comment = ko.observable();
            this.search();
        }
        viewModel.prototype.drop = function (data) {
            var _this = this;
            utils.confirm('确定要退订吗？').then(function (cs) {
                cs.close();
                return api.order.delete(data.id);
            }).then(function () {
                _this.loadData();
                utils.alert('退订成功！');
            });
        };
        viewModel.prototype.setComment = function (data) {
            this.id(data.id);
            this.comment(data.comment);
        };
        viewModel.prototype.update = function () {
            var _this = this;
            $('#modal-sample').modal('hide');
            api.order.update(this.id(), this.comment()).then(function () {
                utils.alert('更新成功！');
                _this.loadData();
            }).fail(function () {
                utils.alert('更新失败！');
            });
        };
        viewModel.prototype.search = function () {
            this.searchParams({ time: this.queryTime(), userName: this.userName() });
            this.loadData();
        };
        viewModel.prototype.exportExcel = function () {
            postForm('/api/foodOrder/export', { time: this.queryTime(), userName: this.userName() });
        };
        return viewModel;
    })(pager);
    function postForm(url, data) {
        var form = document.createElement('form');
        form.action = url;
        form.method = 'POST';
        form.target = '_black';
        function travelSimple(key, value) {
            if (value !== undefined) {
                var input = document.createElement('textarea');
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
        }
        function travelObject(pk, o) {
            for (var key in o) {
                var value = o[key];
                var trueKey = pk ? pk + '.' + key : key;
                travelX(trueKey, value);
            }
        }
        function travelArray(pk, o) {
            for (var i = 0; i < o.length; ++i) {
                var key = pk + '[' + i + ']';
                travelX(key, o[i]);
            }
        }
        function travelX(pk, value) {
            if ($.isArray(value)) {
                travelArray(pk, value);
            }
            else if (typeof value == 'object') {
                travelObject(pk, value);
            }
            else {
                travelSimple(pk, value);
            }
        }
        travelObject(null, data);
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        setTimeout(function () { return form.parentNode.removeChild(form); }, 15);
    }
    return new viewModel();
});
