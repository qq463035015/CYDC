define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var Pager = (function () {
        function Pager() {
            this.page = ko.observable(1);
            this.pageSize = ko.observable(12);
            this.orderBy = ko.observable();
            this.asc = ko.observable(true);
        }
        Pager.prototype.loadData = function (url, page, pageSize, orderBy, asc) {
            if (orderBy !== undefined)
                this.orderBy(orderBy);
            if (asc !== undefined)
                this.asc(asc);
            var searchParams = {
                page: this.page(),
                pageSize: this.pageSize(),
                orderBy: this.orderBy(),
                asc: this.asc()
            };
            var result;
            $.post("/api/" + (url) + "/list", searchParams).then(function (data) { result = data; });
            return result;
        };
        return Pager;
    })();
    var viewModel = (function () {
        function viewModel() {
            this.page = new Pager();
            this.foodMenu = ko.observableArray();
            this.tasteType = ko.observableArray();
            this.location = ko.observableArray();
            this.siteNotice = ko.observableArray();
            var url = ['foodMenu', 'tasteType', 'location', 'siteNotice'];
            this.foodMenu(this.page.loadData(url[0]));
            this.tasteType(this.page.loadData(url[1]));
            this.location(this.page.loadData(url[2]));
            this.siteNotice(this.page.loadData(url[3]));
        }
        viewModel.prototype.activate = function () {
            return $.when();
        };
        return viewModel;
    })();
    return new viewModel();
});
//# sourceMappingURL=menu.js.map