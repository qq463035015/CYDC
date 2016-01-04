define(["require", "exports", 'plugins/router', 'service/auth', 'service/api', 'service/utils'], function (require, exports, router, auth, api, utils) {
    var viewModel = (function () {
        function viewModel() {
            this.router = router;
            this.auth = auth;
        }
        viewModel.prototype.activate = function () {
            router.makeRelative({ moduleId: 'viewModels' });
            router.map([
                { route: ['', 'home/index'], moduleId: 'home/index', title: '首页', nav: true, },
                { route: 'home/record', moduleId: 'home/record', title: '点餐记录', nav: true },
                { route: 'home/user', moduleId: 'home/user', title: '用户管理', nav: true },
                { route: 'home/menu', moduleId: 'home/menu', title: '菜谱管理', nav: true, hasChildRoutes: true },
                { route: 'home/bill', moduleId: 'home/bill', title: '账单管理', nav: false },
                { route: 'home/order', moduleId: 'home/order', title: '点餐列表', nav: true },
                { route: 'account/login', moduleId: 'account/login', title: '登录', nav: false },
                { route: 'account/register', moduleId: 'account/register', title: '注册', nav: false },
                { route: 'account/changePassword', moduleId: 'account/changePassword', title: '修改密码', nav: false }
            ]).mapUnknownRoutes('error/404').buildNavigationModel();
            return router.activate({ pushState: true, root: '/' });
        };
        ;
        viewModel.prototype.logout = function () {
            api.account.logout().then(function () {
                utils.navigateToLogin();
            });
        };
        return viewModel;
    })();
    return new viewModel();
});
