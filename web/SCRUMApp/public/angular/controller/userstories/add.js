angular.module('UserStories', [])
    .controller('UserStoriesAddController', ['$scope', '$routeParams', '$location', 'UserStoriesServices','SprintServices',
        function ($scope, $routeParams, $location, UserStoriesServices, SprintServices) {

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
                    for (sprint of $scope.sprints){
                        if (sprint._id != userstory.sprint) {
                        } else {
                            userstory.sprint = sprint;
                            userstory["num_sprint"] = 'Sprint' + sprint.number_sprint;
                        }
                    }
                    UserStoriesServices.addUsToList(userstory);
                });
            };
        }]);