module Cydc {
    export class Api {
        static $inject = ["$http"];
        constructor(public $http: angular.IHttpService) {
        }

        location = new location(this.$http);
        type = new tasteType(this.$http);
        menu = new foodMenu(this.$http);
        notice = new siteNotice(this.$http);
        order = new foodOrder(this.$http);
        auth = new Auth(this.$http);
        clientInfo = new foodOrderClientInfo(this.$http);
        user = new user(this.$http);
        accountDetails = new AccountDetails(this.$http);
    }

    class user {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post("/api/user/list", query);
        }

        getUserAmount() {
            return this.$http.post("/api/user/getUserAmount", null);
        }
    }

    class AccountDetails {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post("/api/accountDetails/list", query);
        }

        create(userId: string, amount: Number) {
            return this.$http.post('/api/accountDetails/create', { userId: userId, amount: amount });
        }
    }

    class foodOrderClientInfo {
        constructor(public $http: angular.IHttpService) {
        }

        create() {
            return this.$http.post('/api/foodOrderClientInfo/create', null);
        }
    }

    class foodOrder {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post('/api/foodOrder/list', query);
        }

        create(menuId: Number, locationId: Number, tasteId: Number, comment: string, name: string) {
            return this.$http.post('/api/foodOrder/create', { foodMenuId: menuId, locationId: locationId, tasteId: tasteId, comment: comment, userName: name });
        }

        delete(id: number) {
            return this.$http.post('/api/foodOrder/delete', { id: id });
        }

        pay(id: number) {
            return this.$http.post('/api/foodOrder/pay', { id: id });
        }

        cancelPay(id: number) {
            return this.$http.post('/api/foodOrder/cancelPay', { id: id });
        }

        update(id: number, comment: string) {
            return this.$http.post('/api/foodOrder/update', { id: id, comment: comment });
        }

        select(time: Date, userName: string) {
            return this.$http.post('/api/foodOrder/list', { time: time, userName: userName });
        }

        historyList(query?: baseQuery) {
            return this.$http.post('/api/foodOrder/historyList', query);
        }

        export(time: Date, userName: string) {
            return this.$http.post('/api/foodOrder/export', { time: time, userName: userName });
        }
    }

    class menuIndex {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post('/api/foodMenu/list', query);
        }
    }

    class foodMenu {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post('/api/foodMenu/list', query);
        }

        enableList(query?: baseQuery) {
            return this.$http.post('/api/foodMenu/enableList', query);
        }

        create(title: string, details: string, price: number) {
            return this.$http.post('/api/foodMenu/create', { details: details, title: title, price: price });
        }

        delete(id: number) {
            return this.$http.post('/api/foodMenu/delete', { id: id });
        }

        update(id: number, enabled: boolean) {
            return this.$http.post('/api/foodMenu/UpdateEnable', { id: id, enabled: enabled });
        }
    }

    class tasteType {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post('/api/tasteType/list', query);
        }

        enabledTasteTypes(query?: baseQuery) {
            return this.$http.post('/api/tasteType/enabledTasteTypes', query);
        }

        toggleEnable(id: number, enabled: boolean) {
            return this.$http.post('/api/tasteType/toggleEnable', { id: id, enabled: enabled });
        }

        delete(id: number) {
            return this.$http.post('/api/tasteType/delete', { id: id });
        }

        create(name: string) {
            return this.$http.post('/api/tasteType/create', { name: name });
        }
    }

    class location {
        constructor(public $http: angular.IHttpService) {
        }

        list(query?: baseQuery) {
            return this.$http.post('/api/location/list', query);
        }

        enabledLocationList(query?: baseQuery) {
            return this.$http.post('/api/location/enabledLocationList', query);
        }

        toggleEnable(id: number, enabled: boolean) {
            return this.$http.post('/api/location/toggleEnable', { id: id, enabled: enabled });
        }

        delete(id: number) {
            return this.$http.post('/api/location/delete', { id: id });
        }

        create(name: string) {
            return this.$http.post('/api/location/create', { name: name });
        }
    }

    class siteNotice {
        constructor(public $http: angular.IHttpService) {
        }

        getSiteNotice() {
            return this.$http.post('/api/siteNotice/getSiteNotice', null);
        }

        update(content: string) {
            return this.$http.post('/api/siteNotice/update', { content: content });
        }
    }

    interface baseQuery {
        orderBy?: string;
        asc?: boolean;
    }

    interface basePagedQuery {
        page?: number;
        pageSize?: number;
    }
}