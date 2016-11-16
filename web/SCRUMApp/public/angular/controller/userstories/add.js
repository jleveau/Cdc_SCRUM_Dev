angular.module('UserStories', [])
    .controller('UserStoriesAddController', ['$scope', '$routeParams', '$location', 'UserStoriesServices','SprintServices',
        function ($scope, $location, $routeParams, UserStoriesServices, SprintServices) {

            $scope.idProject = $routeParams.project_id;
            $scope.params = $routeParams;
            $scope.sprints = [];

            SprintServices.getProjectSprints($scope.idProject).then(function(response){
                $scope.sprints = response;
            });

            $scope.createUserStory = function () {
                UserStoriesServices.create($scope.userstory,$scope.idProject)
                .then(function (userstory) {
                    $scope.successMessage = "User story added to the project";
                    $scope.userstory = {};
                    UserStoriesServices.addUsToList(userstory);
                });
            };
        }]);