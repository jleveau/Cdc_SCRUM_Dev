angular.module('UserStories', [])
    .controller('UserStoriesAddController', ['$scope', '$routeParams', '$location', 'UserStoriesServices',
        function ($scope, $location, $routeParams, UserStoriesServices) {

            $scope.idProject = $scope.params.project_id;
            $scope.params = $routeParams;

            $scope.createUserStory = function () {
                UserStoriesServices.create($scope.userstory,$scope.idProject)
                .then(function (userstory) {
                    $scope.userstory = {};
                    UserStoriesServices.addUsToList(userstory);
                });
            };
        }]);