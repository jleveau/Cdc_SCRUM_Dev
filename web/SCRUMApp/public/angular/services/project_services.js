angular.module('ProjectServices', [])

// super simple service
// each function returns a promise object
    .factory('Projects', function($http) {
        var project = null;

        var setProject = function (_project){
            project = _project;
        };

        var addMember = function(user,success, fail) {
            if (project.member_list.length == 0) success();
            if (!project.member_list.some(function(value){
                    if (value == null)
                        return false;
                    return user.id == value.id;
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
            create : function(project_data) {
                return $http.post('/api/project', project_data).then(function(response){
                    return response.data;
                });
            },
            delete : function(id) {
                return $http.delete('/api/project/' + id).then(function(response){
                    return response.data;
                });
            },
            update : function(project_data){
                return $http.put('/api/project/' + project_data._id, project_data).then(function(response){
                    return response.data;
                });
            },
            updateMembers: function(){
                console.log(project);
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
            addMember: addMember
        }
    });