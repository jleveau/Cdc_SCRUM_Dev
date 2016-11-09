/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks',[])
    .controller('TasksAddController', ['$scope', '$location','$mdDialog', 'TasksServices',
        function ($scope, $location,$mdDialog, TasksServices) {

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
                    }
                }

            };

    }]);