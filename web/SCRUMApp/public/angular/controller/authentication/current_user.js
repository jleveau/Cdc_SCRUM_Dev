//angular modules
angular.module('Authentication')
    .controller('CurrentUserController', ['$scope', '$location','AuthService',function ($scope, $location, AuthService) {
        $scope.current_user = null;

        AuthService.getLoggedUser().then(function() {
            if (AuthService.getUserStatus()){
                AuthService.getCurrentUser().then(function(){
                    $scope.current_user = AuthService.getUserStatus();
                });
            }
        });

        $scope.go_to_userpage = function ( ) {
            $location.path( "/users/" + $scope.current_user._id);
        };

    }]);