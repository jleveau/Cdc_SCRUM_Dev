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
                console.log($scope.tasks);
            });

            $scope.editTask = function(task){
                if ($scope.project)
                    $location.path( "/project/" +  $scope.project._id + "/tasks/" + task._id + "/edit");
            };

            $scope.deleteTask = function(task){
                //TODO
            };

    }]);