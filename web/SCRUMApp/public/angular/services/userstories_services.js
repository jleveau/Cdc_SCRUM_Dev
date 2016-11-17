angular.module('UserStories')
    .factory('UserStoriesServices',
        ['$q', '$timeout', '$http',
            function ($q, $timeout, $http) {

                var listUser = null;

                var newUs = false;

                var setListUS = function (_listUserStories){
                    listUser = _listUserStories;
                };

                var addUsToList = function (_userstory){
                    listUser.push(_userstory);
                };

                function getUsByID(idUS) {
                    return $http.get('api/userstory/edit/'+idUS).then(function (response) {
                        return response.data;
                    });
                };

                function updateUS(userstory_data,idUs) {
                    var req_body = {userstory : userstory_data , idUS : idUs};
                    return $http.put('/api/userstory/update',req_body).then(function (response) {
                        return response.data;
                    });
                };

                function getUserstoryTasks(userstory_id){
                    return $http.get('/api/userstory/' + userstory_id + '/tasks').then(function (response) {
                        return response.data;
                    });
                }
                
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

                    updatePriority: function (user_story) {
                        return $http.put('/api/userstory/'+user_story._id+'/priority/'+user_story.priority).then(function (response) {
                            return response.data;
                        });
                    },

                    updateCost: function (user_story) {
                        return $http.put('/api/userstory/'+user_story._id+'/cost/'+user_story.cost).then(function (response) {
                            return response.data;
                        });
                    },

                    delete: function (us_id) {
                        return $http.delete('/api/userstory/' + us_id).then(function (response) {
                            return response.data;
                        });
                    },

                    updateUS : updateUS,
                    getUsByID : getUsByID,
                    setListUS: setListUS,
                    addUsToList:addUsToList,
                    getUserstoryTasks : getUserstoryTasks
                };

            }]);