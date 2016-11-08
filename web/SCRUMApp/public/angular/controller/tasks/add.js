/**
 * Created by julien on 07/11/16.
 */
angular.module('Tasks',[])
    .controller('TasksAddController', ['$scope', '$location','$mdDialog', 'TasksServices',
        function ($scope, $location,$mdDialog, TasksServices) {

            $scope.showPrompt = function($event){
                    var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: $event,
                    templateUrl: '/partials/dialog_tasks.jade',
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