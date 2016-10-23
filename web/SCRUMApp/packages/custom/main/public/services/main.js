(function() {
    'use strict';

    function Main($http, $q) {
        return {
            name: 'main',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/main/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.main')
        .factory('Main', Main);

    Main.$inject = ['$http', '$q'];

})();
