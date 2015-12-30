import http = require('plugins/http');

module service {
    export class api {
        location = new location();
        type = new tasteType();
        menu = new foodMenu();
        notice = new siteNotice();
        order = new foodOrder();
        account = new account();
    }

    class foodOrder {
        list(query?: baseQuery) {
            return http.post('/api/foodOrder/list', query);
        }

        create(menuId: Number, orderLocationId: Number, tasteId: Number, comment: string) {
            return http.post('/api/foodOrder/create', { foodMenuId: menuId, orderLocationId: orderLocationId, tasteId: tasteId, comment: comment })
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

        tasteTypeDDl(query?: baseQuery) {
            return http.post('/api/tasteType/TasteTypeDDl', query);
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

        locationDDl(query?: baseQuery) {
            return http.post('/api/location/locationDDl', query);
        }

        delete(id: number) {
            return http.post('/api/location/delete', { id: id });
        }

        create(name: string) {
            return http.post('/api/location/create', { name: name });
        }
    }

    class siteNotice {
        list(query?: baseQuery) {
            return http.post('/api/siteNotice/list', query);
        }

        update(id: number, content: string) {
            return http.post('/api/siteNotice/update', { id: id, content: content });
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
            return http.post('/api/account/login', { userName: userName, password: password });
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


        checkUserName(userName: string) {
            return http.get('/api/account/checkUserName', { username: userName });
        }

        checkEmail(email: string) {
            return http.get('/api/account/checkEmail', { email: email });
        }
    }
}

export = new service.api();