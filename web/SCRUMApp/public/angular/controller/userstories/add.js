angular.module('UserStories',[])
    .controller('UserStoriesAddController', ['$scope', '$location', 'UserStoriesServices',
        function ($scope, $location, UserStoriesServices) {
     $scope.params = $routeParams;

    if($scope.params.project_id){
        UserStoriesServices.get($scope.params.project_id).then(function (response) {
            $scope.userStory = response.data;
        })
    }

     $scope.createUserStory = function () {
        console.log($scope.params);
     };
    }]);