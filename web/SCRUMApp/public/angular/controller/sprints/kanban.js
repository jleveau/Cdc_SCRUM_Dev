angular.module('Sprints',[])
    .controller('KanbanController', ['$scope', '$mdDialog', '$timeout', '$location', '$routeParams', 'TasksServices', 'Projects','UserStoriesServices', 'SprintServices',
        function ($scope, $mdDialog,  $timeout,  $location, $routeParams, TasksServices, Projects, UserStoriesServices, SprintServices) {

            $scope.current_sprint = null;
            $scope.list_sprints = null;
            $scope.listUserStories = [];
            $scope.all_tasks = [];
            $scope.project = null;
            $scope.selected_task = null;

            var project_id = $routeParams.project_id;

            Projects.get(project_id).then(function(response){
                $scope.project = response.data;
            });

            function changeCurrentSprint(sprint){
                $scope.current_sprint = sprint;
                SprintServices.setCurrentSprint(sprint);
                SprintServices.getSprintUserstories(sprint._id).then(function(userstories){
                    $scope.listUserStories = userstories;
                    TasksServices.getTaskForSprint(sprint._id).then(function(response){
                        $scope.all_tasks = [];
                        //TODO change  this
                        //Build list of tasks of each userstory of the sprint
                        //It's really dirty
                        for (userstory of $scope.listUserStories){
                            userstory.tasks = [];
                        }
                        for (task of response){
                            if (task.list_us.length == 0)
                                $scope.all_tasks.push(task);
                            else{
                                task.list_us.forEach(function(task_us){
                                    for (userstory of $scope.listUserStories){
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

            $scope.showAddTaskForm = function($event,userstory){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/sprint_add_task.jade',
                    locals: {
                        sprint: $scope.current_sprint,
                        userstory: userstory,
                        project: $scope.project
                    },
                    controller: DialogController
                }).finally(function() {
                    $scope.changeCurrentSprint($scope.current_sprint);
                });
                function DialogController($scope, $mdDialog, sprint, userstory, project) {
                    $scope.sprint = sprint;
                    $scope.userstory = userstory;
                    $scope.project = project;
                    $scope.form = {};
                    $scope.create = true;
                    $scope.userstory_title = null;
                    if (userstory && userstory.number_us)
                        $scope.userstory_title = "US#" + userstory.number_us;
                    else
                        $scope.userstory_title = "ALL";
                    $scope.task = {
                        id_project : project._id,
                        sprint: sprint,
                        list_us : []
                    };
                    if (userstory){
                        $scope.task.list_us.push(userstory);
                    }

                    $scope.create = function() {
                        TasksServices.create($scope.task).then(function(new_task){
                            if (userstory)
                              userstory.tasks.push(new_task);
                            Projects.addTask(new_task).then(function(project){
                                $mdDialog.hide();
                            });
                        });
                    };
                    $scope.close = function(){
                        $mdDialog.hide();
                    }
                }
            };

            $scope.showEditForm = function($event,task){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/sprint_add_task.jade',
                    locals: {
                        task: task,
                        project: $scope.project,
                        sprint : $scope.selected_task.sprint
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, task, project,sprint) {
                    $scope.form = {};
                    $scope.task = task;
                    $scope.project = project;
                    $scope.sprint = sprint;
                    $scope.create = false;

                    $scope.update = function() {
                        TasksServices.update($scope.task).then(function(task){
                            $mdDialog.hide();
                        });
                    };
                    $scope.close = function(){
                        $mdDialog.hide();
                    }
                }
            };

            $scope.selectTask = function(task){
                $scope.selected_task = task;
            };

            $scope.deleteTask = function(task) {
                TasksServices.deleteTask(task._id).then(function (response) {
                    $scope.selected_task = null;
                    $scope.changeCurrentSprint($scope.current_sprint);
                });
            };

            $scope.showUserStoryDescription = function($event,userstory){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/userstory_description.jade',
                    locals: {
                        userstory: userstory
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, userstory) {
                    $scope.userstory = userstory;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                }
            }
        }]);