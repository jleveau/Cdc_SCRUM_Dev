//angular modules
angular.module('Authentication')

    .controller('RegistrationController', ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.register = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.username,
                                $scope.registerForm.password,
                                $scope.registerForm.mail)
            // handle success
                .then(function () {
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Username already taken";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };
    }]);