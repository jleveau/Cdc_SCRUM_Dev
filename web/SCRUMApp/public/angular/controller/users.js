//angular modules
angular.module('User',[])

    .controller('UserController', ['$scope','$routeParams', function($scope,$routeParams) {
        $scope.params = $routeParams;


        // TODO Replace with getCurrent_User($scope.params.id)
        $scope.user = {
            username: "username",
            mail: "email",
            password: "password",
            image: null,
            first_name: null,
            last_name: null,
             followed_projects: [{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' },{ name : 'toto' }],
            date_created: new Date(),
            date_updated: new Date()
        }



    }]);