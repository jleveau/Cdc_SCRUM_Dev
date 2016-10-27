var SCRUMApp = angular.module('SCRUMApp',["ngRoute","ngResource"]);

SCRUMApp.config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "/partials/home.jade",
                        controller: "HomeController"
                    })
                    .otherwise({redirectTo: "/"});
            }
        ]);