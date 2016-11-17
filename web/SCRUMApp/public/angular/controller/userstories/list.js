angular.module('UserStories')
    .controller('UserStoriesListController', ['$scope', '$routeParams', '$location', 'UserStoriesServices','SprintServices',
        function ($scope, $routeParams, $location, UserStoriesServices, SprintServices) {

            var project_id = $routeParams.project_id;

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
            $scope.myFilter = "";

            SprintServices.getProjectSprints(project_id).then(function(response){
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
            $scope.applyFilter = function(valueSelected, oldValue){
                $scope.myFilter = "";
                $scope.myFilter = valueSelected.value;
                $scope.invoiceTotal = 0;

                if(!oldValue || 'Sprint' == oldValue.value){
                    for (us of $scope.listUserStories){
                        if(valueSelected.value === us.num_sprint) {
                            $scope.invoiceTotal = $scope.invoiceTotal + us.cost;
                        }
                    }
                }
            };

            $scope.$watch('listUserStories.length',
                function(newValue, oldValue){
                    if(newValue !== oldValue && newValue > oldValue){
                        $scope.totalCostUs = 0;
                        for (user_story of $scope.listUserStories){
                            $scope.totalCostUs =  $scope.totalCostUs + user_story.cost;
                        }
                    }
                }, true
            );

            $scope.update_us = function (us) {
               $location.path('/project/'+ project_id + '/userstory/'+ us._id +'/edit');
            };


            $scope.updatePriority = function (user_story) {
                UserStoriesServices.updatePriority(user_story).then(function(response){

                });
            };

            $scope.updateCostUs = function (user_story) {
                UserStoriesServices.updateCost(user_story).then(function(response){
                    $scope.totalCostUs = 0;
                    for (user_story of $scope.listUserStories){
                        $scope.totalCostUs =  $scope.totalCostUs + user_story.cost;
                    }
                    $scope.invoiceTotal =  $scope.totalCostUs;
                });
            };

            $scope.delete_us = function (us) {
                var _id = us._id;
                var cost_us = us.cost;
                var index = $scope.listUserStories.indexOf(us);
                UserStoriesServices.delete(_id).then(function(response){
                    $scope.listUserStories.splice(index,1);
                    $scope.totalCostUs =  $scope.totalCostUs - cost_us;
                    $scope.invoiceTotal =  $scope.totalCostUs;
                });
            };

            if ($scope.params.project_id){
                UserStoriesServices.get($scope.params.project_id).then(function(response){
                    $scope.listUserStories = response.data;
                    for (us of $scope.listUserStories){
                        if(us.sprint) {
                            us["num_sprint"] = 'Sprint' + us.sprint.number_sprint;
                        }else{
                            us["num_sprint"] = 'Sprint_';
                        }
                        $scope.totalCostUs = $scope.totalCostUs + us.cost;
                        //$scope.invoiceTotal =  $scope.totalCostUs;
                    }
                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            }

    }]);