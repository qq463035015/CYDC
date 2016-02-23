import router = require('plugins/router');
import composition = require('durandal/composition');
import ko = require('knockout');
import auth = require('service/auth');
import api = require('service/api');
import utils = require('service/utils');

class viewModel {
    router = router;

    auth = auth;

    activate() {
        router.makeRelative({ moduleId: 'viewModels' });
        router.map([
            { route: ['', 'home/index'], moduleId: 'home/index', title: '首页', nav: true, visible: true},
            { route: 'home/record', moduleId: 'home/record', title: '点餐记录', nav: true, visible: true },
            { route: 'home/user', moduleId: 'home/user', title: '用户管理', nav: true, visible: auth.isAdmin },
            { route: 'home/menu', moduleId: 'home/menu', title: '菜谱管理', nav: true, hasChildRoutes: true, visible: auth.isAdmin },
            { route: 'home/bill', moduleId: 'home/bill', title: '账单管理', nav: true, visible: auth.isAdmin },
            { route: 'home/order', moduleId: 'home/order', title: '点餐列表', nav: true, visible: auth.isAdmin },
            { route: 'home/about', moduleId: 'home/about', title: '关于', nav: true, visible: true },
            { route: 'account/login', moduleId: 'account/login', title: '登录', nav: false },
            { route: 'account/register', moduleId: 'account/register', title: '注册', nav: false },
            { route: 'account/changePassword', moduleId: 'account/changePassword', title: '修改密码', nav: false }, 
            { route: 'account/forgotPassword', moduleId: 'account/forgotPassword', title: '忘记密码', nav: false }, 
            { route: 'account/resetPassword', moduleId: 'account/resetPassword', title: '重置密码', nav: false }
        ]).mapUnknownRoutes('error/404').buildNavigationModel();
        return router.activate({ pushState: true, root: '/' });
    };

    logout() {
        api.account.logout().then(() => {
            utils.navigateToLogin();
        });
    }
}

export = new viewModel();