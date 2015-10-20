namespace cydc.ui.amd {
    const jquery = 'jquery';
    const ko = 'ko';
    const bootstrap = 'bootstrap';

    require.config({
        baseUrl: '/js',
        paths: {
            [jquery]: 'lib/jquery', 
            [ko]: 'lib/knockout', 
            [bootstrap]: 'lib/bootstrap'
        }
    });
}