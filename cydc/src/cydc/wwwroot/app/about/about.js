var Cydc;
(function (Cydc) {
    var Controllers;
    (function (Controllers) {
        var About;
        (function (About) {
            var AboutCtrl = (function () {
                function AboutCtrl(pageInfo) {
                    this.pageInfo = pageInfo;
                    pageInfo.setId("about");
                }
                AboutCtrl.$inject = ["menuInfo"];
                return AboutCtrl;
            }());
            About.AboutCtrl = AboutCtrl;
        })(About = Controllers.About || (Controllers.About = {}));
    })(Controllers = Cydc.Controllers || (Cydc.Controllers = {}));
})(Cydc || (Cydc = {}));
