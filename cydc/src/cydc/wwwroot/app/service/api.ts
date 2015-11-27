import http = require('plugins/http');

module service {
    export class api {
        location = new location();
        type = new tasteType();
        menu = new foodMenu();
        notice = new siteNotice();
    }

    class foodMenu {
        list(query?: baseQuery) {
            return http.post('/api/foodMenu/list', query);
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
}

export = new service.api();