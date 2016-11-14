angular.module('UserStories')
    .controller('UserStoriesEditController', ['$scope', '$routeParams', '$location', 'UserStoriesServices',
        function ($scope, $location, $routeParams, UserStoriesServices) {

            var idUserStory = $scope.params.id;
            var idProject = $scope.params.project_id;
            $scope.userstory = null;

            if ($scope.params.id) {
                UserStoriesServices.getUsByID(idUserStory).then(function (response) {
                    $scope.userstory = response;
                    console.log(response);
                });
            };

            $scope.updateUserStory = function () {
                UserStoriesServices.updateUS($scope.userstory,idUserStory).then(function (response) {
                    $location.path('/api/userstory/'+idProject+'/backlog');
                });
            };
            
        }]);