import http = require('plugins/http');
import auth = require('service/auth');

module service {
    export class api {
        location = new location();
        type = new tasteType();
        menu = new foodMenu();
        notice = new siteNotice();
        order = new foodOrder();
        account = new account();
        clientInfo = new foodOrderClientInfo();
        user = new user();
        accountDetails = new AccountDetails();
    }

    class user {
        list(query?: baseQuery) {
            return http.post("/api/user/list", query);
        }
    }

    class AccountDetails {
        list(query?: baseQuery) {
            return http.post("/api/accountDetails/list", query);
        }

        create(userId: string, amount: Number) {
            return http.post('/api/accountDetails/create', { userId: userId, amount: amount });
        }
    }

    class foodOrderClientInfo {
        create() {
            return http.post('/api/foodOrderClientInfo/create', null);
        }
    }

    class foodOrder {
        list(query?: baseQuery) {
            return http.post('/api/foodOrder/list', query);
        }

        create(menuId: Number, locationId: Number, tasteId: Number, comment: string) {
            return http.post('/api/foodOrder/create', { foodMenuId: menuId, locationId: locationId, tasteId: tasteId, comment: comment });
        }

        delete(id: number) {
            return http.post('/api/foodOrder/delete', { id: id });
        }

        select(time: Date, userName: string) {
            return http.post('/api/foodOrder/list', { time: time, userName: userName });
        }

        historyList(query?: baseQuery) {
            return http.post('/api/foodOrder/historyList', query);
        }

        export(time: Date, userName: string) {
            return http.post('/api/foodOrder/export', { time: time, userName: userName });
        }
    }

    class menuIndex {
        list(query?: baseQuery) {
            return http.post('/api/foodMenu/list', query);
        }
    }

    class foodMenu {
        list(query?: baseQuery) {
            return http.post('/api/foodMenu/list', query);
        }

        enableList(query?: baseQuery) {
            return http.post('/api/foodMenu/enableList', query);
        }

        create(title: string, details: string, price: number) {
            return http.post('/api/foodMenu/create', { details: details, title: title, price: price });
        }

        delete(id: number) {
            return http.post('/api/foodMenu/delete', { id: id });
        }

        update(id: number, enabled: boolean) {
            return http.post('/api/foodMenu/UpdateEnable', { id: id, enabled: enabled });
        }
    }

    class tasteType {
        list(query?: baseQuery) {
            return http.post('/api/tasteType/list', query);
        }

        enabledTasteTypes(query?: baseQuery) {
            return http.post('/api/tasteType/enabledTasteTypes', query);
        }

        toggleEnable(id: number, enabled: boolean) {
            return http.post('/api/tasteType/toggleEnable', { id: id, enabled: enabled });
        }

        delete(id: number) {
            return http.post('/api/tasteType/delete', { id: id });
        }

        create(name: string) {
            return http.post('/api/tasteType/create', { name: name });
        }
    }

    class location {
        list(query?: baseQuery) {
            return http.post('/api/location/list', query);
        }

        enabledLocationList(query?: baseQuery) {
            return http.post('/api/location/enabledLocationList', query);
        }

        toggleEnable(id: number, enabled: boolean) {
            return http.post('/api/location/toggleEnable', { id: id, enabled: enabled });
        }

        delete(id: number) {
            return http.post('/api/location/delete', { id: id });
        }

        create(name: string) {
            return http.post('/api/location/create', { name: name });
        }
    }

    class siteNotice {
        getSiteNotice() {
            return http.post('/api/siteNotice/getSiteNotice', null);
        }

        update(content: string) {
            return http.post('/api/siteNotice/update', { content: content });
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

    class account {
        login(userName: string, password: string) {
            return http.post('/api/account/login', { userName: userName, password: password }).then(() => auth.onLogin());
        }

        register(email: string, username: string, password: string, confirmedPassword: string) {
            return http.post('/api/account/register', {
                email: email,
                username: username,
                password: password,
                confirmedPassword: confirmedPassword
            });
        }

        changePassword(password: string, newPassword: string, confirmedPassword: string) {
            return http.post('/api/account/changePassword', {
                password: password,
                newPassword: newPassword,
                confirmedPassword: confirmedPassword
            });
        }

        logout() {
            return http.post('/api/account/logout', null).always(() => {
                auth.onLogout();
            });
        }

        checkUserName(userName: string) {
            return http.get('/api/account/checkUserName', { username: userName });
        }

        checkEmail(email: string) {
            return http.get('/api/account/checkEmail', { email: email });
        }
    }
}

export = new service.api();