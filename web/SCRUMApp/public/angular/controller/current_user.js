//angular modules
angular.module('Authentication')
    .controller('CurrentUserController', ['$scope', '$location','AuthService',function ($scope, $location, AuthService) {

        if (!AuthService.getUserStatus()){
            AuthService.getLoggedUser().then(function() {
                AuthService.getCurrentUser().then(function(){
                    $scope.current_user = AuthService.getUserStatus();
                });
            });
        }
        else {
            AuthService.getCurrentUser().then(function(){
                $scope.current_user = AuthService.getUserStatus();
            });
        }

        $scope.isCurrentUser = function(user){
            return $scope.current_user._id = user._id;
        }

        $scope.go_to_userpage = function ( ) {
            $location.path( "/users/" + $scope.current_user._id);
        };

    }]);