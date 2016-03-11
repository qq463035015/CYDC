var Cydc;
(function (Cydc) {
    var Service;
    (function (Service) {
        var pageIdInfos = [
            {
                id: "foodOrder",
                name: "点餐列表",
                link: "/"
            },
            {
                id: "foodOrderList",
                name: "用户点餐",
                link: "/foodOrder/list"
            },
            {
                id: "about",
                name: "关于",
                link: "/about"
            }
        ];
        var userMenus = pageIdInfos.filter(function (x) {
            return ["foodOrder", "foodOrderList", "about"].indexOf(x.id) !== -1;
        });
        var adminMenus = pageIdInfos.filter(function (x) {
            return ["foodOrder", "foodOrderList", "about"].indexOf(x.id) !== -1;
        });
        var MenuInfo = (function () {
            function MenuInfo($location) {
                this.currentPage = userMenus[0];
                this.currentPage = this.infoByLink($location.path());
            }
            MenuInfo.prototype.setId = function (id) {
                this.currentPage = this.infoById(id);
                this.title = this.currentPage.name;
            };
            MenuInfo.prototype.userMenus = function () {
                return userMenus;
            };
            MenuInfo.prototype.adminMenus = function () {
                return adminMenus;
            };
            MenuInfo.prototype.infoById = function (id) {
                return pageIdInfos.filter(function (x) { return x.id === id; })[0];
            };
            MenuInfo.prototype.infoByLink = function (link) {
                var val = pageIdInfos.filter(function (x) {
                    return x.link.trim().toUpperCase() == link.trim().toUpperCase();
                })[0];
                return val || this.userMenus()[0];
            };
            MenuInfo.$inject = ["$location"];
            return MenuInfo;
        }());
        Service.MenuInfo = MenuInfo;
    })(Service = Cydc.Service || (Cydc.Service = {}));
})(Cydc || (Cydc = {}));
