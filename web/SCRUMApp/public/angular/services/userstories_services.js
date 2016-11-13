angular.module('UserStories')
    .factory('UserStoriesServices',
        ['$q', '$timeout', '$http',
            function ($q, $timeout, $http) {

                var listUser = null;

                var setListUS = function (_listUserStories){
                    listUser = _listUserStories;
                };

                var addUsToList = function (_userstory){
                    listUser.push(_userstory);
                };

                return {
                    get: function (id) {
                        return $http.get('/api/project/backlog/' + id);
                    },
                    create: function (userstory_data, projectId) {
                        var req_dody = {userstory: userstory_data, idProject: projectId}
                        return $http.post('/api/userstory', req_dody).then(function (response) {
                            return response.data;
                        });
                    },
                    updatePriorityUs: function () {
                        /*
                        return $http.put('/api/project/product_owner/' + project._id, project).then(function (response) {
                            return response.data;
                        });
                        */
                    },

                    delete: function (project_id, us_id) {
                        return $http.delete('/api/project/' + project_id + '/backlog/userstory/' + us_id).then(function (response) {
                            return response.data;
                        });
                    },

                    setListUS: setListUS,
                    addUsToList:addUsToList
                };

            }]);