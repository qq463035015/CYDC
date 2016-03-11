namespace Cydc.Service {
    export class Auth implements AuthState {
        userName = "";
        authed = false;
        isAdmin = false;

        static $inject = ["$http"];
        constructor(
            private $http: ng.IHttpService) {
        }

        refreshState() {
            return this.$http.post<AuthState>('/api/account/loginStatus', null).then(a => {
                this.userName = a.data.userName;
                this.authed = a.data.authed;
                this.isAdmin = a.data.isAdmin;
            });
        }

        onLogin() {
            this.refreshState();
        }

        onLogout() {
            this.refreshState();
        }




        login(userName: string, password: string, rememberMe: boolean) {
            return this.$http.post('/api/account/login', { userName: userName, password: password, rememberMe: rememberMe })
                .then(() => this.onLogin());
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

    export interface AuthState {
        userName: string;
        authed: boolean;
        isAdmin: boolean;
    }
}