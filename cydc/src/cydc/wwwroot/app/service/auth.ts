import ko = require('knockout');

module service {
    export class auth {
        onLogin(ctx: { userName: string }) {
            this.userName(ctx.userName);
        }

        onLogout() {
            this.userName(null);
        }

        userName = ko.pureComputed({
            read: () => localStorage.getItem(keys.userName), 
            write: (v) => localStorage.setItem(keys.userName, v)
        });
    }
    
    class keys {
        static userName = 'auth-userName';
    }
}

export = new service.auth();