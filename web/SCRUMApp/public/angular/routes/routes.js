var Routes = angular.module('Routes',["ngRoute","ngResource",])
    .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when("/", {
                        title: "Home",
                        templateUrl: "/partials/home.jade",
                        controller: "HomeController",
                        url: "/",
                        access: {restricted: false}
                    })
                    .when("/login", {
                        templateUrl: "/partials/user_login.jade",
                        controller: "LoginController",
                        url:"/login",
                        access: {restricted: false}
                    })
                    .when("/registration", {
                        templateUrl: "/partials/user_registration_page.jade",
                        controller: "RegistrationController",
                        url: "/registration",
                        access: {restricted: false}
                    })
                    .when('logout',{
                        controller: "LogoutController",
                        url: "/logout",
                        access: {restricted: true}
                    })
                    .when("/project/new", {
                        templateUrl: "/partials/project_form.jade",
                        controller: "ProjectController",
                        url: "/project/new",
                        title: "New Project",
                        access: {restricted: true}
                    })
                    .when("/project/edit/:project_id", {
                        templateUrl: "/partials/project_form.jade",
                        controller: "ProjectController",
                        url: "/project/edit",
                        title: "Edit Project",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id", {
                        templateUrl: "/partials/project.jade",
                        controller: "ProjectController",
                        title: "Project",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/team", {
                        title: "Team",
                        templateUrl: "/partials/team.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/backlog", {
                        title : "Backlog",
                        templateUrl: "/partials/backlog.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/sprints", {
                        title: "Sprints",
                        templateUrl: "/partials/sprints.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/tasks", {
                        title: "Tasks",
                        templateUrl: "/partials/tasks.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/tasks/:task_id/edit", {
                        title: "Edit Task",
                        templateUrl: "/partials/task_edit.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/pert", {
                        templateUrl: "/partials/pert.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/project/:project_id/burndown", {
                        templateUrl: "/partials/burndown.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })
                    .when("/users/:user_id", {
                        title: "Member Page",
                        templateUrl: "/partials/user.jade",
                        controller: "UserController",
                        access: {restricted: true}

                    }).when("/project/:project_id/userstory/:us_id/edit",{
                        title: "Edit User Story",
                        templateUrl: "/partials/edit_userstory.jade",
                        controller: "ProjectController",
                        access: {restricted: true}
                    })

                    .otherwise({redirectTo: "/"});
                $locationProvider.html5Mode(true);
            }
        ]);

Routes.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getLoggedUser().then(function(){
                if (next.url == '/' && AuthService.getUserStatus()){
                    $location.path('/users/' + AuthService.getUserStatus()._id);
                    $route.reload();
                }
                if (next.access){
                    if (next.access.restricted && AuthService.isLoggedIn() === false) {
                        $location.path('/login');
                        $route.reload();
                    }
                }
            });
        });
});

Routes.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = 'SCRUMApp - ' + $route.current.title;
    });
}]);