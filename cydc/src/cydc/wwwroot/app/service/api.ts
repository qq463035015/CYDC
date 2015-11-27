import $ = require('jquery');
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
            return $.post('/api/foodMenu/list', query);
        }

        Install(title: string, details: string, price: number) {
            return http.post('/api/foodMenu/install', { details: details, title: title, price: price });
        }

        delete(id: number) {
            return $.post('/api/foodMenu/delete', { id: id });
        }

        update(id: number, enable: boolean) {
            return $.post('/api/foodMenu/update', { id: id, enable: enable });
        }
    }

    class tasteType {
        list(query?: baseQuery) {
            return $.post('/api/tasteType/list', query);
        }

        delete(id: number) {
            return $.post('/api/tasteType/delete', { id: id });
        }

        install(name: string) {
            return $.post('/api/tasteType/install', { name: name });
        }
    }

    class location {
        list(query?: baseQuery) {
            return $.post('/api/location/list', query);
        }

        delete(id: number) {
            return $.post('/api/location/delete', { id: id });
        }

        install(name: string) {
            return $.post('/api/location/install', { name: name });
        }
    }

    class siteNotice {
        list(query?: baseQuery) {
            return $.post('/api/siteNotice/list', query);
        }

        update(id: number, content: string) {
            return $.post('/api/siteNotice/update', { id: id, content: content });
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