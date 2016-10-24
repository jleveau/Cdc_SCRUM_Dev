(function() {
    'use strict';

    /* jshint -W098 */

    function MainController($scope, Global, Main, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'main'
        };

        $scope.checkCircle = function() {
            Main.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'Global', 'Main', '$stateParams'];

})();
