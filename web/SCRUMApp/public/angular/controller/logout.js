//angular modules
angular.module('Authentication')
    .controller('LogoutController', ['$scope', '$location','AuthService',function ($scope, $location, AuthService) {

        $scope.logged = function(){
            return AuthService.isLoggedIn();
        };

        $scope.logout = function () {

            // call logout from service
            AuthService.logout()
                .then(function () {
                    $location.path('/');
                });

        };

    }]);