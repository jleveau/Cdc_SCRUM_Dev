(function () {
  'use strict';

  angular.module('mean.meanStarter')
    .controller('SCRUPAppController', ['$scope', function($scope) {
      $scope.greeting = 'Hola!';
    }]);

  //StarterController.$inject = ['$scope', 'Global'];

/* function StarterController ($scope, Global) {
    // Original scaffolded code.
    $scope.global = Global;
    $scope.package = {
      name: 'SCRUMApp'
    };
  }*/
})();
