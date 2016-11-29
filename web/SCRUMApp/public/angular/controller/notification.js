angular.module('Notification',[])

    .controller('NotificationController', ['$scope', '$sce', '$routeParams','Projects','$http','$location','NotificationService', 'AuthService',
        function($scope,$sce, $routeParams,Projects,$http,$location,NotificationService, AuthService) {

                $scope.notifications = [];
                $scope.current_user = null;

                AuthService.getCurrentUser().then(function(){
                        $scope.current_user = AuthService.getUserStatus();
                        NotificationService.getUserNews($scope.current_user).then(function(){
                                $scope.notifications = NotificationService.getNotifications();
                                for (notification of $scope.notifications){
                                        notification.body = $sce.trustAsHtml(notification.body);
                                }
                        });
                });

                $scope.getUserPageURL = function(user){
                        $location.path( "/users/" + user._id);
                };

        }]);