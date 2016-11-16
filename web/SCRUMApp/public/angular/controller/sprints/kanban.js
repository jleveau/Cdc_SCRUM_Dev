angular.module('Sprints',[])
    .controller('KanbanController', ['$scope', '$timeout', '$location', '$routeParams', 'TasksServices', 'Projects','UserStoriesServices', 'SprintServices',
        function ($scope,  $timeout,  $location, $routeParams, TasksServices, Projects, UserStoriesServices, SprintServices) {

            $scope.current_sprint = null;
            $scope.list_sprints = null;

            $scope.user_story = {};
            var project_id = $routeParams.project_id;

            SprintServices.getProjectSprints(project_id).then(function(response){
                $scope.list_sprints = response;
                SprintServices.setSprintsForProject(response);

                //TODO change for the first sprint not validated
                SprintServices.setCurrentSprint(response[0]);
                $scope.current_sprint = response[0];
            });

            $scope.changeCurrentSprint = function (){
                //TODO update userstories
            };

            if ($scope.params.project_id){
                UserStoriesServices.get($scope.params.project_id).then(function(response){
                    $scope.listUserStories = response.data;
                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            }

        }]);