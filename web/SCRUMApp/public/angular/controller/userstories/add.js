angular.module('UserStories', [])
    .controller('UserStoriesAddController', ['$scope', '$routeParams', '$location', 'UserStoriesServices',
        function ($scope, $location, $routeParams, UserStoriesServices) {
            $scope.params = $routeParams;

            $scope.createUserStory = function () {
                console.log($scope.params.project_id);
                UserStoriesServices.create($scope.userstory,$scope.project_id)
                .then(function (response) {
                   console.log(response);
                });
            };
        }]);