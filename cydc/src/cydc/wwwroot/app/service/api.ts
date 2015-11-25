import http = require('plugins/http');

module service {
    export class api {
        location = new location();
    }

    class location {
        list(query?: baseQuery) {
            return http.post('/api/location/list', query);
        }

        delete(id: number) {
            return http.post('/api/location/delete', { id: id });
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