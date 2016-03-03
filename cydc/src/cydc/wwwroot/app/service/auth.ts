module service {
    export class auth {
        authed: boolean;
        userName: string;
        isAdmin: boolean;

        static $inject = ["$http"];
        constructor(public $http: angular.IHttpService) {
            this.refreshState();
        }

        refreshState() {
            return this.$http.post('/api/account/loginStatus', null).then((a: authObj) => {
                this.authed = a.authed;
                this.userName = a.userName;
                this.isAdmin = a.isAdmin;
            });
        }

        onLogin() {
            this.refreshState();
        }

        onLogout() {
            this.refreshState();
        }




        login(userName: string, password: string) {
            return this.$http.post('/api/account/login', { userName: userName, password: password }).then(() => this.onLogin());
        }

        register(email: string, username: string, password: string, confirmedPassword: string) {
            return this.$http.post('/api/account/register', {
                email: email,
                username: username,
                password: password,
                confirmedPassword: confirmedPassword
            });
        }

        changePassword(password: string, newPassword: string, confirmedPassword: string) {
            return this.$http.post('/api/account/changePassword', {
                password: password,
                newPassword: newPassword,
                confirmedPassword: confirmedPassword
            });
        }

        forgotPassword(email: string) {
            return this.$http.post('/api/account/forgotPassword', {
                email: email
            });
        }

        resetPassword(email: string, code: string, password: string, confirmedPassword: string) {
            return this.$http.post('/api/account/resetPassword', {
                email: email,
                code: code,
                password: password,
                confirmedPassword: confirmedPassword
            });
        }

        logout() {
            return this.$http.post("/api/account/logout", null).finally(() => {
                this.onLogout();
            });
        }

        checkUserName(userName: string) {
            return this.$http.post('/api/account/checkUserName', { username: userName });
        }

        checkEmail(email: string) {
            return this.$http.post('/api/account/checkEmail', { email: email });
        }
    }

    interface authObj {
        userName: string;
        authed: boolean;
        isAdmin: boolean;
    }
}