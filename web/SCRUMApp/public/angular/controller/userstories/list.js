angular.module('UserStories')
<<<<<<< HEAD
    .controller('UserStoriesListController', ['$scope', '$location', 'UserStoriesServices','SprintServices',
        function ($scope, $location, UserStoriesServices, SprintServices) {
=======
    .controller('UserStoriesListController', ['$scope', '$routeParams', '$location', 'UserStoriesServices',
        function ($scope, $routeParams, $location, UserStoriesServices) {

            var project_id = $routeParams.project_id;
            var us_id = $routeParams.project_id;
>>>>>>> e3e6f3d0c7d1e8bbc8e47463520c5ec2a2862c00

            $scope.user_story = {};
            //show the userstory description
            $scope.tooltip = false;

            //total cost of us
            $scope.totalCostUs = 0;
            $scope.invoiceTotal = 0;
            //setTotals(user_story)
            $scope.setTotals = function(item){
                 if (item){
                    $scope.invoiceTotal += item.cost;
                }

                $scope.$watch('selectSprintValue', function(newValue, oldValue){
                    if(newValue.value == 'Sprint'){
                        $scope.invoiceTotal = $scope.totalCostUs;
                    }
                });
            };

            //filter for column Sprint
            $scope.myFilter = "Sprint";

            SprintServices.getProjectSprints($scope.idProject).then(function(response){
                $scope.selectSprint = [];
                var ele_initial = {"label":"All Sprints",
                                   "value":"Sprint"};
                $scope.selectSprint.push(ele_initial);
                for (sprint of response){

                    var ele_sprint = {"label":"Sprint"+sprint.number_sprint,
                        "value":"Sprint"+sprint.number_sprint};
                    $scope.selectSprint.push(ele_sprint);
                }
            });
            $scope.selectSprintValue = "";
            $scope.applyFilter = function(valueSelected){
                $scope.myFilter = "";
                $scope.myFilter = valueSelected.value;
                $scope.invoiceTotal = 0;

                $scope.$watch('selectSprintValue', function(newValue, oldValue){
                    if(oldValue.value == 'Sprint'){
                        $scope.invoiceTotal = 0;
                        for(us of  $scope.listUserStories){
                            //todo
                        }
                    }
                });
            };

            $scope.update_us = function (us) {
               $location.path('/project/'+ project_id + '/userstory/'+ us._id +'/edit');
            };

            $scope.updatePriority = function (user_story) {
                UserStoriesServices.updatePriority(user_story).then(function(response){

                });
            };

            $scope.updateCostUs = function (user_story) {
                UserStoriesServices.updateCost(user_story).then(function(response){

                });
            };

            $scope.delete_us = function (us) {
                var _id = us._id;
                var index = $scope.listUserStories.indexOf(us);
                UserStoriesServices.delete(_id).then(function(response){
                    $scope.listUserStories.splice(index,1);
                });
            };

            if ($scope.params.project_id){
                UserStoriesServices.get($scope.params.project_id).then(function(response){
                    $scope.listUserStories = response.data;
                    for (us of $scope.listUserStories){
                       us["num_sprint"] = 'Sprint'+us.sprint.number_sprint;
                        $scope.totalCostUs = $scope.totalCostUs + us.cost;
                    }
                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            }
    }]);