/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks')
    .controller('TasksEditController', ['$scope','$mdDialog', '$location','$routeParams','TasksServices',
        function ($scope, $mdDialog, $location, $routeParams, TasksServices) {

            var task_id = $routeParams.task_id;
            $scope.task = null;

            TasksServices.getTask(task_id).then(function(response){
                $scope.task = response;
                TasksServices.setRelatedUserstories($scope.task.list_us);
                TasksServices.setListDependencies($scope.task.list_tasks_depend);
                console.log($scope.task);
            });

            $scope.create= function(){
                return false;
            };

            $scope.editTask = function(){
                if ($scope.task && $scope.task.responsable &&  $scope.task.responsable._id)
                     $scope.task.responsable = $scope.task.responsable._id;
                $scope.task.list_tasks_depend = TasksServices.getListDependencies();
                $scope.task.list_us = TasksServices.getRelatedUserstories();
                console.log($scope.task);
                TasksServices.update($scope.task).then(function(response){
                   $location.path( "/project/" +  $scope.project._id + "/tasks/");
                });
            };

            $scope.cancel = function(){
                $location.path( "/project/" +  $scope.project._id + "/tasks/");
            };

            $scope.showDependencies = function($event){
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/dialog_tasks_dependencies.jade',
                    locals: {
                        items: $scope.items,
                        create: $scope.create
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, items, create) {
                    $scope.items = items;
                    $scope.create = create;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
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
                        items: $scope.items,
                        create: $scope.create
                    },
                    controller: DialogController
                });
                function DialogController($scope, $mdDialog, items, create) {
                    $scope.items = items;
                    $scope.create = create;
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                }
            };

        }]);
