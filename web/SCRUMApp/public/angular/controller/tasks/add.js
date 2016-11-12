/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks',[])
    .controller('TasksAddController', ['$scope', '$location', '$routeParams', '$mdDialog', 'TasksServices', 'Projects','UserStoriesServices',
        function ($scope, $location, $routeParams, $mdDialog, TasksServices, Projects, UserStoriesServices) {


            $scope.task = {};
            $scope.successMessage = '';
            var project_id = $routeParams.project_id;
            $scope.userstories = [];
            $scope.related_userstories =  TasksServices.getRelatedUserstories();
            $scope.project = null;


            Projects.get(project_id).then(function(response){
                $scope.project = response.data;
            });

            Projects.getProjectUserstories(project_id).then(function(response){
                $scope.userstories = response;
            });

            $scope.createTask = function(){
                $scope.task.list_us = TasksServices.getRelatedUserstories();
                TasksServices.create($scope.task).then(function(response){
                    $scope.task=response;
                    Projects.addTask($scope.task).then(function(response){
                        successMessage = 'New task added to the project';
                        $scope.task = {};
                    });
                });
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
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                }
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
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                        TasksServices.setRelatedUserstories($scope.related_userstories);
                    }
                }

            };

            $scope.isChecked = function(id){
                var match = false;
                for(var i=0 ; i < $scope.related_userstories.length; i++) {
                    if($scope.related_userstories[i]._id == id){
                        match = true;
                    }
                }
                return match;
            };

            $scope.sync = function(bool, item){
                if(bool){
                    // add item
                    $scope.related_userstories.push(item);
                } else {
                    // remove item
                    for(var i=0 ; i < $scope.related_userstories.length; i++) {

                        if($scope.related_userstories[i]._id == item._id){
                            $scope.related_userstories.splice(i,1);
                        }
                    }
                }
            };


        }]);