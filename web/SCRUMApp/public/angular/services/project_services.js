angular.module('ProjectServices', [])

// super simple service
// each function returns a promise object
    .factory('Projects', function($http) {
        var project = null;

        var setProject = function (_project){
            project = _project;
        };

        var addMember = function(user,success, fail) {
            if (!project.member_list.some(function(value){ return user.id == value.id; })) {
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
            create : function(project_data) {
                return $http.post('/api/project', project_data);
            },
            delete : function(id) {
                return $http.delete('/api/project/' + id);
            },
            update : function(project_data){
                return $http.put('/api/project/' + project_data.id, project_data);
            },
            updateProject : function(){
                return $http.put('/api/project/' + project.id, project);
            },
            setProject: setProject,
            addMember: addMember
        }
    });