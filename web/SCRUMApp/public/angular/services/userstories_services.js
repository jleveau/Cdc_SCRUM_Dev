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
                    create : function (userstory_data,user_id) {
                        var req_dody = {user : user_id , userStory : userstory_data}
                        return $http.post('/api/userstory',req_dody).then(function (response) {
                            return response.data;
                        });
                    },
                    setListUS: setListUS
                });

}]);