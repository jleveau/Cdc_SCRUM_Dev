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
                    create : function (userstory_data,projectId) {
                        var req_dody = {userstory: userstory_data , idProject : projectId}
                        return $http.post('/api/userstory',req_dody).then(function (response) {
                            return response.data;
                        });
                    },
                    setListUS: setListUS
                });

}]);