angular.module('Sprints',[])
    .controller('KanbanController', ['$scope', '$timeout', '$location', '$routeParams', 'TasksServices', 'Projects','UserStoriesServices', 'SprintServices',
        function ($scope,  $timeout,  $location, $routeParams, TasksServices, Projects, UserStoriesServices, SprintServices) {

            $scope.current_sprint = null;
            $scope.list_sprints = null;
            $scope.listUserStories = [];

            var project_id = $routeParams.project_id;

            SprintServices.getProjectSprints(project_id).then(function(response){
                $scope.list_sprints = response;
                SprintServices.setSprintsForProject(response);

                //TODO change for the first sprint not validated
                SprintServices.setCurrentSprint(response[0]);

                $scope.current_sprint = response[0];
                SprintServices.getSprintUserstories($scope.current_sprint._id).then(function(userstories){
                    $scope.listUserStories = userstories;
                });
            });

            $scope.changeCurrentSprint = function (){
                SprintServices.setCurrentSprint($scope.current_sprint);
                SprintServices.getSprintUserstories($scope.current_sprint._id).then(function(userstories){
                    $scope.listUserStories = userstories;
                });
            };

            $scope.addTask = function(us){

            }


        }]);