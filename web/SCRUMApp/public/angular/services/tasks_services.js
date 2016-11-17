
angular.module('Tasks')
    .factory('TasksServices',
        ['$q', '$timeout', '$http',

            function ($q, $timeout, $http) {

                var related_userstories = [];
                var list_dependencies = [];

                var list_tasks = null;


                function setRelatedUserstories(usertories){
                    related_userstories = usertories;
                }

                var setListTasks = function(tasks){
                    list_tasks = tasks;
                };

                var addTaskToListTasks = function (task){
                    list_tasks.push(task);
                };

                function getRelatedUserstories(){
                    return related_userstories;
                }


                function setListDependencies(dependencies){
                    list_dependencies = dependencies;
                }

                function getListDependencies(){

                    return list_dependencies;
                }

                function getTask(task_id){
                    return $http.get('/api/tasks/info/' + task_id).then(function(response){
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
                    return $http.delete('/api/task/' + task_id).then(function(response){
                        return response.data;
                    });
                }

                function update(task){
                    return $http.put('/api/tasks/' + task._id,task).then(function(response){
                        return response.data;
                    });
                }

                function getTaskForSprint(sprint_id){
                    return $http.get('/api/tasks/sprint/' + sprint_id).then(function(response){
                        return response.data;
                    });
                }

                return ({
                    getTask : getTask,
                    setListDependencies : setListDependencies,
                    getListDependencies : getListDependencies,
                    setListTasks : setListTasks,
                    addTaskToListTasks : addTaskToListTasks,
                    setRelatedUserstories,
                    getRelatedUserstories,
                    getList: getList,
                    create: create,
                    deleteTask: deleteTask,
                    update : update,
                    getTaskForSprint:getTaskForSprint
                });

            }]);
