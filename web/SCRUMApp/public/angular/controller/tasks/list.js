/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks')
    .controller('TasksListController', ['$scope', '$routeParams', '$location', 'TasksServices', 'Projects',
        function ($scope, $routeParams, $location, TasksServices, Projects) {

            $scope.project = null;
            $scope.tasks = null;
            var project_id = $routeParams.project_id;


            Projects.get(project_id).then(function(response){
                $scope.project = response.data;
                $scope.tasks = $scope.project.tasks;
                TasksServices.setListTasks ($scope.project.tasks);
            });

            $scope.editTask = function(task){
                if ($scope.project)
                    $location.path( "/project/" +  $scope.project._id + "/tasks/" + task._id + "/edit");
            };

            $scope.deleteTask = function(task){
                var _id = task._id;
                var index = $scope.tasks.indexOf(task);

                TasksServices.deleteTask($scope.project._id, _id).then(function(response){
                    $scope.tasks.splice(index,1);
                    $location.path( "/project/" + $scope.project._id + "/tasks");
                });
            };

    }]);