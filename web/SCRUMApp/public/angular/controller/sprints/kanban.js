angular.module('Sprints',[])
    .controller('KanbanController', ['$scope', '$mdDialog', '$timeout', '$location', '$routeParams', 'TasksServices', 'Projects','UserStoriesServices', 'SprintServices',
        function ($scope, $mdDialog,  $timeout,  $location, $routeParams, TasksServices, Projects, UserStoriesServices, SprintServices) {

            $scope.current_sprint = null;
            $scope.list_sprints = null;
            $scope.listUserStories = [];
            $scope.all_tasks = [];

            var project_id = $routeParams.project_id;

            function changeCurrentSprint(sprint){
                $scope.current_sprint = sprint;
                SprintServices.setCurrentSprint(sprint);
                SprintServices.getSprintUserstories(sprint._id).then(function(userstories){
                    $scope.listUserStories = userstories;
                    TasksServices.getTaskForSprint(sprint._id).then(function(response){
                        var tasks = response;
                        $scope.all_tasks = [];

                        //TODO change  this
                        //Build list of tasks of each userstory of the sprint
                        //It's really dirty
                        for (task of response){
                            if (task.list_us.length == 0)
                                $scope.all_tasks.push(task)
                            else{
                                task.list_us.forEach(function(task_us){
                                    for (userstory of $scope.listUserStories){
                                        userstory.tasks = [];
                                        if (userstory._id == task_us._id){
                                            userstory.tasks.push(task);
                                        }
                                    }
                                });
                            }
                        }
                    });
                });
            }

            SprintServices.getProjectSprints(project_id).then(function(response){
                $scope.list_sprints = response;
                SprintServices.setSprintsForProject(response);

                //TODO change for the first sprint not validated
                changeCurrentSprint(response[0]);
            });

            $scope.changeCurrentSprint = function (){
                changeCurrentSprint($scope.current_sprint);
            };

            $scope.addTask = function(us){

            };

            $scope.showDescription = function($event,task){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/task_description.jade',
                    locals: {
                        task: task
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, task) {
                    $scope.task = task;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                }
            }
        }]);