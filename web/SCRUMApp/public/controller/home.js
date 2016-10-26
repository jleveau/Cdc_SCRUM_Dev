// public/core.js
var home = angular.module('home',['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

function HomeController($scope, $http) {
    $scope.title = "SCRUMApp"

}
