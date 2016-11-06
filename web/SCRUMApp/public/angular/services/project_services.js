angular.module('ProjectServices', [])

// super simple service
// each function returns a promise object
    .factory('Projects', function($http) {
        var project = null;

        var setProject = function (_project){
            project = _project;
        };

        var setProductOwner = function(user,success){
            if (user) {
                project.product_owner = user;
                success();
            }
        }

        var addMember = function(user,success, fail) {
            if (project.member_list.length == 0) success();
            if (!project.member_list.some(function(value){
                    return user._id == value._id;
            })) {
                project.member_list.push(user);
                success();
            }
            else
                fail();
        };

        return {
            get : function(id) {
                return $http.get('/api/project/' + id);
            },
            getAll: function(){
                return $http.get('/api/all_projects').then(function(response){
                    return response.data;
                });
            },
            getPublic:function(){
                return $http.get('/api/projectsPublic').then(function(response){
                    return response.data;
                });
            },
            create : function(project_data, user_id) {
                var req_body = {user : user_id, project : project_data}
                return $http.post('/api/project', req_body).then(function(response){
                    return response.data;
                });
            },
            delete : function(id) {
                return $http.delete('/api/project/' + id).then(function(response){
                    return response.data;
                });
            },
            updateProductOwner: function(){
                return $http.put('/api/project/product_owner/' + project._id, project).then(function(response){
                    return response.data;
                });
            },
            updateMembers: function(){
                return $http.put('/api/project/members/' + project._id, project).then(function(response){
                    return response.data;
                });
            },
            updateProject : function(){
                return $http.put('/api/project/' + project._id, project).then(function(response){
                    return response.data;
                });
            },

            setProject: setProject,
            addMember: addMember,
            setProductOwner: setProductOwner
        }
    });