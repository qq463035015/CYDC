import ko = require('knockout');

module service {
    export class auth {
        onLogin(ctx: { userName: string }) {
            this.authed(true);
            this.userName(ctx.userName);
            this.saveState();
        }

        onLogout() {
            this.authed(false);
            this.userName(null);
            this.saveState();
        }

        authed = ko.observable<boolean>();

        userName = ko.observable<string>();

        constructor() {
            this.loadState();
        }
        
        private loadState() {
            let obj = <authObj>JSON.parse(sessionStorage.getItem(keys.authObj));
            if (obj != null) {
                this.userName(obj.userName);
                this.authed(obj.authed);
            }
        }

        private saveState() {
            let obj: authObj = {
                authed: this.authed(), 
                userName: this.userName()
            };
            sessionStorage.setItem(keys.authObj, JSON.stringify(obj));
        }
    }

    interface authObj {
        userName: string;
        authed: boolean;
    }
    
    class keys {
        static authObj = 'auth-obj';
    }
}

export = new service.auth();