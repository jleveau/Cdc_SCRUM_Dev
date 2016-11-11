angular.module('UserStories')
    .controller('UserStoriesListController', ['$scope', '$location', 'UserStoriesServices',
        function ($scope, $location, UserStoriesServices) {
            //console.log($scope.params.project_id);

            $scope.view_us = function(us_num){
                alert("us number is "+us_num);
            };

            $scope.view_sprint = function (sprint_num) {
                alert("sprint_num is "+sprint_num);
            };

            $scope.delete_us = function (us_num) {

                UserStoriesServices.delete($scope.params.project_id, us_num).then(function(response){
                    $location.path( "/project/" + $scope.params.project_id + "/backlog");
                });
            };


            if ($scope.params.project_id){
                UserStoriesServices.get($scope.params.project_id).then(function(response){
                    $scope.listUserStories = response.data;

                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            };
    }]);