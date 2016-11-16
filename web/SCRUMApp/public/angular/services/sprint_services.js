
angular.module('Sprints')
    .factory('SprintServices',
        ['$q', '$timeout', '$http',

            function ($q, $timeout, $http) {

                var sprints_for_project;
                var current_sprint;

                function setCurrentSprint(sprint){
                    current_sprint = sprint;
                }

                function getCurrentSprint(){
                    return  current_sprint;
                }

                function setSprintsForProject(list_of_sprint){
                    sprints_for_project = list_of_sprint;
                }

                function getSprintsForProject(){
                    return sprints_for_project;
                }

                function getProjectSprints(project_id){
                    return $http.get('/api/project/' + project_id + '/sprint/').then(function(response){
                        return response.data;
                    });
                }

                function getSprintUserstories(sprint_id){
                    return $http.get('/api/sprint/' + sprint_id + '/userstories').then(function(response){
                        return response.data;
                    });
                }

                return ({
                    setCurrentSprint : setCurrentSprint,
                    getCurrentSprint : getCurrentSprint,
                    setSprintsForProject : setSprintsForProject,
                    getSprintsForProject : getSprintsForProject,
                    getProjectSprints : getProjectSprints,
                    getSprintUserstories : getSprintUserstories
                });

            }]);
