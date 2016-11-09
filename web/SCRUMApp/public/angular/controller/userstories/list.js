angular.module('UserStories')
    .controller('UserStoriesListController', ['$scope', '$location', 'UserStoriesServices',
        function ($scope, $location, UserStoriesServices) {
            //console.log($scope.params.project_id);

            if ($scope.params.project_id){
                UserStoriesServices.get($scope.params.project_id).then(function(response){
                    $scope.listUserStories = response.data;

                    UserStoriesServices.setListUS($scope.listUserStories);
                });
            }
    }]);