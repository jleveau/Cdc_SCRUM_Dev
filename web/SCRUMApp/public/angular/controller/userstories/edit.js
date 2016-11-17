angular.module('UserStories')
    .controller('UserStoriesEditController', ['$scope', '$location', '$routeParams', 'UserStoriesServices', 'SprintServices',
        function ($scope, $location, $routeParams, UserStoriesServices, SprintServices) {

            var idProject= $routeParams.project_id;
            var idUserStory = $routeParams.us_id;
            $scope.userstory = null;

            SprintServices.getProjectSprints(idProject).then(function(response){
                $scope.sprints = response;
            });

            if (idUserStory) {
                UserStoriesServices.getUsByID(idUserStory).then(function (response) {
                    $scope.userstory = response;
                });
            };

            $scope.updateUserStory = function () {
                UserStoriesServices.updateUS($scope.userstory,idUserStory).then(function (response) {
                   // $location.path('/project/'+idProject+'/backlog');
                });
            };

            $scope.cancel = function(){
                $location.path('/project/'+ idProject +'/backlog');
            }
            
        }]);