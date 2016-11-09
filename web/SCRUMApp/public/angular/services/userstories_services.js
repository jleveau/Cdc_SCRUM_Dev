angular.module('UserStories')
    .factory('UserStoriesServices',
        ['$q', '$timeout', '$http',
            function ($q, $timeout, $http) {

                var listUser = null;

                var setListUS = function (_listUserStories){
                    listUser = _listUserStories;
                };

                return ({
                    get : function(id) {
                        return $http.get('/api/project/backlog/' + id);
                    },

                    setListUS: setListUS
                });

}]);