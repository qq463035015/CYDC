namespace Cydc.Controllers.About {
    export class AboutCtrl {
        static $inject = ["menuInfo"];
        constructor(
            private pageInfo: Service.MenuInfo
        ) {
            pageInfo.setId("about");
        }
    }
}