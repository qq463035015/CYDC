var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var Widgets;
        (function (Widgets) {
            var MenuCtrl = (function () {
                function MenuCtrl($scope, pageInfo, auth) {
                    this.$scope = $scope;
                    this.pageInfo = pageInfo;
                    this.auth = auth;
                    window["menu"] = this;
                    console.log("FUCK");
                }
                MenuCtrl.prototype.menus = function () {
                    return this.auth.isAdmin ?
                        this.pageInfo.userMenus() :
                        this.pageInfo.adminMenus();
                };
                MenuCtrl.prototype.currentId = function () {
                    return this.pageInfo.currentPage.id;
                };
                MenuCtrl.$inject = ["$scope", "menuInfo", "auth"];
                return MenuCtrl;
            }());
            Widgets.MenuCtrl = MenuCtrl;
        })(Widgets = Controllers.Widgets || (Controllers.Widgets = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
;
