import ko = require('knockout');
import http = require('plugins/http');

module service {
    export class auth {
        authed = ko.observable<boolean>();
        userName = ko.observable<string>();
        isAdmin = ko.observable<boolean>(false);

        refreshState() {
            return http.post('/api/account/loginStatus', null).then((a: authObj) => {
                this.authed(a.authed);
                this.userName(a.userName);
                this.isAdmin(a.isAdmin);
            });
        }

        onLogin() {
            this.refreshState();
        }

        onLogout() {
            this.refreshState();
        }

        constructor() {
            this.refreshState();
        }
    }

    interface authObj {
        userName: string;
        authed: boolean;
        isAdmin: boolean;
    }
}

export = new service.auth();