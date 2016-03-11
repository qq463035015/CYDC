namespace Cydc.Controllers.About {
    export class AboutCtrl {
        static $inject = ["pageInfo"];
        constructor(
            private pageInfo: Service.PageInfo
        ) {
            pageInfo.title = "关于";
        }
    }
}