/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks')
    .controller('TasksEditController', ['$scope', '$location','$routeParams','TasksServices',
        function ($scope, $location, $routeParams, TasksServices) {

            var task_id = $routeParams.task_id;
            $scope.task = null;
            $scope.create=false;

            TasksServices.getTask(task_id).then(function(response){
                $scope.task = response;
            });

            $scope.editTask = function(){
                if ($scope.task && $scope.task.responsable &&  $scope.task.responsable._id)
                     $scope.task.responsable = $scope.task.responsable._id;
                TasksServices.update($scope.task).then(function(response){
                    $location.path( "/project/" +  $scope.project._id + "/tasks/");
                });
            }

            $scope.cancel = function(){
                $location.path( "/project/" +  $scope.project._id + "/tasks/");
            }

        }]);