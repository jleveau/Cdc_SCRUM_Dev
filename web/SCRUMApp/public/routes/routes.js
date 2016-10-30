var SCRUMApp = angular.module('SCRUMApp',["ngRoute","ngResource"]);

SCRUMApp.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/", {
                        title: "Home",
                        templateUrl: "/partials/home.jade",
                        controller: "HomeController",
                        url: "/"
                    })
                    .when("/login", {
                        templateUrl: "/partials/user_login.jade",
                        controller: "UserController",
                        url:"/login"
                    })
                    .when("/registration", {
                        templateUrl: "/partials/user_registration_page.jade",
                        controller: "UserController",
                        url: "registration"
                    })
                    .when("/project/:project_id", {
                        templateUrl: "/partials/project.jade",
                        controller: "ProjectController",
                        title: "Project"
                     })
                    .when("/project/:project_id/team", {
                        templateUrl: "/partials/team.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/backlog", {
                        templateUrl: "/partials/backlog.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/sprints", {
                        templateUrl: "/partials/sprints.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/tasks", {
                        templateUrl: "/partials/tasks.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/pert", {
                        templateUrl: "/partials/pert.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/burndown", {
                        templateUrl: "/partials/burndown.jade",
                        controller: "ProjectController",
                    })

                    .otherwise({redirectTo: "/"});
                $locationProvider.html5Mode(true);
            }
        ]);

SCRUMApp.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = 'SCRUMApp - ' + $route.current.title;
    });
}]);