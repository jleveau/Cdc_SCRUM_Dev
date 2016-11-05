//angular modules
angular.module('Authentication')
    .controller('LogoutController',
        [
            function ($scope, $location, AuthService) {

                $scope.logout = function () {

                    // call logout from service
                    AuthService.logout()
                        .then(function () {
                            $location.path('/');
                        });

                };

            }]);