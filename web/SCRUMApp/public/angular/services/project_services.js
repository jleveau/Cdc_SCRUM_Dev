angular.module('ProjectServices', [])

// super simple service
// each function returns a promise object
    .factory('Projects', function($http) {
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
                return $http.put('/api/project', project_data);
            }
        }
    });