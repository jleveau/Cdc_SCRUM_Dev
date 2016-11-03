var Routes = angular.module('Routes',["ngRoute","ngResource"])
    .config(['$routeProvider', '$locationProvider',
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
                    .when("/project/new", {
                        templateUrl: "/partials/project_form.jade",
                        controller: "ProjectController",
                        url: "/project/new",
                        title: "New Project"
                    })
                    .when("/project/:project_id", {
                        templateUrl: "/partials/project.jade",
                        controller: "ProjectController",
                        title: "Project"
                     })
                    .when("/project/:project_id/team", {
                        title: "Team",
                        templateUrl: "/partials/team.jade",
                        controller: "ProjectController",
                    })
                    .when("/project/:project_id/backlog", {
                        title : "Backlog",
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
                    .when("/users/:user_id", {
                        title: "Member Page",
                        templateUrl: "/partials/user.jade",
                        controller: "UserController",
                    })
                    .otherwise({redirectTo: "/"});
                $locationProvider.html5Mode(true);
            }
        ]);

Routes.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = 'SCRUMApp - ' + $route.current.title;
    });
}]);