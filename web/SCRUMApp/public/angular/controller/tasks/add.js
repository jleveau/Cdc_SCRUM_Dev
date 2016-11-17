/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks',[])
    .controller('TasksAddController', ['$scope', '$timeout', '$location', '$routeParams', '$mdDialog', 'TasksServices', 'Projects','UserStoriesServices', 'SprintServices',
        function ($scope,  $timeout,  $location, $routeParams, $mdDialog, TasksServices, Projects, UserStoriesServices, SprintServices) {


            $scope.task = {list_tasks_depend: []};
            $scope.successMessage = '';
            var project_id = $routeParams.project_id;
            $scope.userstories = [];
            $scope.project = null;
            var related_userstories =  TasksServices.getRelatedUserstories();
            var list_dependencies = TasksServices.getListDependencies();
            $scope.form = {};

            $scope.sprints = [];

            SprintServices.getProjectSprints(project_id).then(function(response){
                $scope.sprints = response;
            });

            Projects.get(project_id).then(function(response){
                $scope.project = response.data;
            });

            Projects.getProjectUserstories(project_id).then(function(response){
                $scope.userstories = response;
            });

            $scope.createTask = function(){
                $scope.task.list_us = TasksServices.getRelatedUserstories();
                $scope.task.list_tasks_depend = TasksServices.getListDependencies();
                $scope.task.id_project = $scope.project._id;

                TasksServices.create($scope.task).then(function(response){
                    $scope.task=response;
                    TasksServices.addTaskToListTasks(response);
                    Projects.addTask($scope.task).then(function(response){
                        $scope.successMessage = 'New task added to the project';
                        $scope.task = {list_tasks_depend: []};
                        TasksServices.setListDependencies([]);
                        TasksServices.setRelatedUserstories([]);
                        $scope.form.task_form.$setUntouched();
                        $timeout(function () { $scope.successMessage = ''; }, 3000);
                    });
                });
            };

            $scope.create= function(){
                return true;
            };


            $scope.showDependencies = function($event){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/dialog_tasks_dependencies.jade',
                    locals: {
                        items: $scope.items
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, items) {
                    $scope.items = items;
                    $scope.create = true;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                        TasksServices.setListDependencies(list_dependencies);
                    }
                }
            };

            $scope.showUserStory = function($event){
                    var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/dialog_tasks_userstories.jade',
                    locals: {
                        items: $scope.items
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, items) {
                    $scope.items = items;
                    $scope.create = true;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                        TasksServices.setRelatedUserstories(related_userstories);
                    }
                }
            };

            $scope.isChecked = function(id){
                var match = false;
                for(var i=0 ; i < related_userstories.length; i++) {
                    if(related_userstories[i]._id == id){
                        match = true;
                    }
                }
                return match;
            };

            $scope.sync = function(bool, item){
                if(bool){
                    // add item
                    related_userstories.push(item);
                } else {
                    // remove item
                    for(var i=0 ; i < related_userstories.length; i++) {

                        if(related_userstories[i]._id == item._id){
                            related_userstories.splice(i,1);
                        }
                    }
                }
                TasksServices.setRelatedUserstories(related_userstories);
            };

            $scope.taskIsChecked = function(id){
                var match = false;
                for(var i=0 ; i < list_dependencies.length; i++) {
                    if(list_dependencies[i]._id == id){
                        match = true;
                    }
                }
                return match;
            };

            $scope.taskSync = function(bool, item){
                if(bool){
                    // add item
                    list_dependencies.push(item);
                } else {
                    // remove item
                    for(var i=0 ; i < list_dependencies.length; i++) {

                        if(list_dependencies[i]._id == item._id){
                            list_dependencies.splice(i,1);
                        }
                    }
                }
                TasksServices.setListDependencies(list_dependencies);
            };


        }]);