angular.module('UserStories')
    .controller('UserStoriesListController', ['$scope', '$routeParams', '$location', 'UserStoriesServices',
        function ($scope, $routeParams, $location, UserStoriesServices) {

            var project_id = $routeParams.project_id;
            var us_id = $routeParams.project_id;

            $scope.user_story = {};
            $scope.tooltip = false;
            $scope.invoiceTotal = 0;

            $scope.setTotals = function(item){
                if (item){
                    $scope.invoiceTotal += item.cost;
                }
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
                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            }
    }]);