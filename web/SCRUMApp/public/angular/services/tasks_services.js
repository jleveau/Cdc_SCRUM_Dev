
angular.module('Tasks')
    .factory('TasksServices',
        ['$q', '$timeout', '$http',

            function ($q, $timeout, $http) {

                related_userstories = [];

                function setRelatedUserstories(usertories){
                    related_userstories = usertories;
                }

                function getRelatedUserstories(){
                    return related_userstories;
                }

                function getTask(){
                    return $http.get('/api/tasks/info/:id').then(function(response){
                        return response.data;
                    });
                }

                function getList(){
                    return $http.get('/api/tasks/all').then(function(response){
                        return response.data;
                    });
                }


                function create(task){
                    return $http.post('/api/task/new',task).then(function(response){
                        return response.data;
                    });
                }

                function deleteTask(task_id){
                    return $http.delete('/api/tasks/' + task_id).then(function(response){
                        return response.data;
                    });
                }

                function update(task){
                    return $http.put('/api/tasks/:id',task).then(function(response){
                        return response.data;
                    });
                }

                return ({
                    getTask,getTask,
                    getList: getList,
                    create: create,
                    deleteTask: deleteTask,
                    update : update,
                    setRelatedUserstories,
                    getRelatedUserstories
                });

            }]);
