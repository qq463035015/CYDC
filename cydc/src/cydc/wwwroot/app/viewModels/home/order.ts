import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import moment = require('moment');

class viewModel extends pager<idName> {
    startTime = ko.observable(moment().format('YYYY-MM-DD'));
    endTime = ko.observable();
    userName = ko.observable();
    id = ko.observable<number>();
    comment = ko.observable<string>();

    constructor() {
        super('/api/foodOrder/list');
        this.search();
    }

    drop(data) {
        utils.confirm('确定要退订吗？').then(cs=> {
            cs.close();
            return api.order.delete(data.id);
        }).then(() => {
            this.loadData();
            utils.alert('订单删除成功');
        });
    }

    pay(data) {
        return utils.confirm('确定要付款吗？', '付款后帐单中会自动加上此订单的金额').then(cs => {
            cs.close();
            return api.order.pay(data.id);
        }).then(() => {
            this.loadData();
            return utils.alert("付款成功");
        });
    }

    cancelPay(data) {
        return utils.confirm('确定要取消付款吗？', '付款后帐单中会自动减去此订单的金额').then(cs => {
            cs.close();
            return api.order.cancelPay(data.id);
        }).then(() => {
            this.loadData();
            return utils.alert("取消付款成功");
        });
    }

    setComment(data) {
        this.id(data.id);
        this.comment(data.comment);
    }

    update() {
        $('#modal-sample').modal('hide');
        api.order.update(this.id(), this.comment()).then(() => {
            utils.alert('更新成功！');
            this.loadData();
        }).fail(() => {
            utils.alert('更新失败！');
        });
    }

    search() {
        this.searchParams({ startTime: this.startTime(), endTime: this.endTime(), userName: this.userName() });
        this.loadData();
    }

    exportExcel() {
        postForm('/api/foodOrder/export', { startTime: this.startTime(), endTime: this.endTime(), userName: this.userName() });
    }
}
function postForm(url: string, data: Object) {
    var form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    form.target = '_black';

    function travelSimple(key: string, value: number | string) {
        if (value !== undefined) {
            var input = document.createElement('textarea');
            input.name = key;
            input.value = <string>value;
            form.appendChild(input);
        }
    }

    function travelObject(pk: string, o: Object) {
        for (var key in o) {
            var value = o[key];
            var trueKey = pk ? pk + '.' + key : key;
            travelX(trueKey, value);
        }
    }

    function travelArray(pk: string, o: Array<any>) {
        for (var i = 0; i < o.length; ++i) {
            var key = pk + '[' + i + ']';
            travelX(key, o[i]);
        }
    }

    function travelX(pk: string, value: Array<any> | Object | string | number) {
        if ($.isArray(value)) {
            travelArray(pk, <Array<any>>value);
        } else if (typeof value == 'object') {
            travelObject(pk, <Object>value);
        } else {
            travelSimple(pk, <string>value);
        }
    }

    travelObject(null, data);

    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => form.parentNode.removeChild(form), 15);
}

interface idName {
    id: number;
    name: string;
}

export = new viewModel();