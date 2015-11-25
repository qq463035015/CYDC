import http = require('plugins/http');

module service {
    export class business {
        location = new location();
    }

    class location {
        list() {
            return http.post('/api/location/list', {});
        }
    }
}

export = new service.business();