(function() {
    'use strict';

    function Main($stateProvider) {
        $stateProvider.state('main example page', {
            url: '/main/example',
            templateUrl: 'main/views/index.html'
        }).state('main circles example', {
            url: '/main/example/:circle',
            templateUrl: 'main/views/example.html'
        });
    }

    angular
        .module('mean.main')
        .config(Main);

    Main.$inject = ['$stateProvider'];

    angular.module('mean.main', ['mean.system'])
    .config(['$viewPathProvider', function($viewPathProvider) {
      $viewPathProvider.override('system/views/index.html', 'main/views/index.html');
    }]);
})();
