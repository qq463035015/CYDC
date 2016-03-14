module Cydc.Service {
    let pageIdInfos = <IMenuInfo[]>[
        {
            id: "foodOrder",
            name: "点餐",
            link: "/"
        },
        {
            id: "foodOrderList",
            name: "点餐列表",
            link: "/foodOrder/list"
        },
        {
            id: "about",
            name: "关于",
            link: "/about"
        }
    ];

    let userMenus = pageIdInfos.filter(x =>
        (<MenuId[]>["foodOrder", "foodOrderList", "about"]).indexOf(x.id) !== -1);

    let adminMenus = pageIdInfos.filter(x =>
        (<MenuId[]>["foodOrder", "foodOrderList", "about"]).indexOf(x.id) !== -1);

    export class MenuInfo {
        static $inject = ["$location"];
        constructor($location: ng.ILocationService) {
            this.currentPage = this.infoByLink($location.path());
        }

        setId(id: MenuId) {
            this.currentPage = this.infoById(id);
            this.title = this.currentPage.name;
        }

        userMenus(): IMenuInfo[] {
            return userMenus;
        }

        adminMenus(): IMenuInfo[] {
            return adminMenus;
        }

        currentPage = userMenus[0];
        title: string;

        private infoById(id: MenuId) {
            return pageIdInfos.filter(x => x.id === id)[0];
        }

        private infoByLink(link: string) {
            let val = pageIdInfos.filter(x =>
                x.link.trim().toUpperCase() == link.trim().toUpperCase())[0];
            return val || this.userMenus()[0];
        }
    }

    export type MenuId = "foodOrder" | "foodOrderList" | "about";

    export interface IMenuInfo {
        id: MenuId,
        name: string,
        link: string
    }
}