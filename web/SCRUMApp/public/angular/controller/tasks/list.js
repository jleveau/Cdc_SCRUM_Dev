/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks')
    .controller('TasksListController', ['$scope', '$mdDialog',  '$routeParams', '$location', 'TasksServices', 'Projects',
        function ($scope, $mdDialog,  $routeParams, $location, TasksServices, Projects) {

            $scope.project = null;
            $scope.tasks = null;
            var project_id = $routeParams.project_id;


            Projects.get(project_id).then(function(response){
                $scope.project = response.data;
                $scope.tasks = $scope.project.tasks;
<<<<<<< HEAD
                TasksServices.setListTasks ($scope.tasks);
                console.log($scope.tasks);
=======
                TasksServices.setListTasks ($scope.project.tasks);
>>>>>>> e3e6f3d0c7d1e8bbc8e47463520c5ec2a2862c00
            });

            $scope.editTask = function(task){
                if ($scope.project)
                    $location.path( "/project/" +  $scope.project._id + "/tasks/" + task._id + "/edit");
            };

            $scope.deleteTask = function(task){
                var _id = task._id;
                var index = $scope.tasks.indexOf(task);

                TasksServices.deleteTask(_id).then(function(response){
                    $scope.tasks.splice(index,1);
                    $location.path( "/project/" + $scope.project._id + "/tasks");
                });
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
            };

    }]);