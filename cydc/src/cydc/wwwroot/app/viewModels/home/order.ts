import router = require('plugins/router');
import api = require('service/api');
import ko = require('knockout');
import utils = require('service/utils');
import pager = require('service/pager');
import ko_bindings = require('service/ko_bindings');

class viewModel extends pager<idName> {
    queryTime = ko.observable();
    userName = ko.observable();
    id = ko.observable<number>();
    comment = ko.observable<string>();

    constructor() {
        super('/api/foodOrder/list');
        ko_bindings.fuck();
        this.loadData();
        window['vm'] = this;
    }

    drop(data) {
        utils.confirm('确定要退订吗？').then(cs=> {
            cs.close();
            return api.order.delete(data.id);
        }).then(() => {
            this.loadData();
            utils.alert('退订成功！');
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

    query() {
        this.searchParams({ time: this.queryTime(), userName: this.userName() });
        this.loadData();
    }

    exportExcel() {
        postForm('/api/foodOrder/export', { time: this.queryTime(), userName: this.userName() });
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