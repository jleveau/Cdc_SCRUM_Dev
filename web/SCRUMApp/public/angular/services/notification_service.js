angular.module('Notification')
    .factory('NotificationService',
        ['$q', '$timeout', '$http',
            function($q,$timeout,$http) {

                function getUserNews(user){
                    $http.get('users/userprojects/' + user._id).then(function(response){
                        projects = response.data;
                        notifications = [];
                        i = 0;
                        for (project of projects){
                            $http.get('/api/project/'+ project._id +'/notifications',task).then(function(response){
                                notifications.push(response.data);
                            });
                            i++;

                            if (i == projects.length){
                                return notifications
                            }
                        }
                    });
                }

                function createNewsTaskOnGoing(task){
                    var notification = {
                        project : task.project_id._id,
                        body : "<p>"+task.responsable.username + " has put Task#" + task.number_task+
                        "of project " + task.project_id.name + " on state OnGoing</p>"
                    };
                    return $http.post('/api/notifications/new',notification).then(function(response){
                        return response.data;
                    });
                }

                function createNewsTaskDone(task){
                    var notification = {
                        project : task.project_id._id,
                        body : "<p>"+task.responsable.username + " has put Task#" + task.number_task +
                        "of project " + task.project_id.name+ " on state Done</p>"
                    };
                    return $http.post('/api/notifications/new',notification).then(function(response){
                        return response.data;
                    });
                }

                function createNewsValidateUserStory(userstory, user){
                    var notification = {
                        project : task.project_id._id,
                        body : "<p>"+user.username + " has validated US#" + userstory.number_us+
                        "of project " + task.project_id.name + "</p>"
                    };
                    return $http.post('/api/notifications/new',notification).then(function(response){
                        return response.data;
                    });
                }

                function createNewsEndOfSprint(sprint){
                    var notification = {
                        project : sprint.project._id,
                        body : "<p> Sprint#"+ sprint.number_sprint + " is finished </p>"
                    };
                    return $http.post('/api/notifications/new',notification).then(function(response){
                        return response.data;
                    });
                }

                return ({
                    getUserNews : getUserNews,
                    createNewsTaskOnGoing : createNewsTaskOnGoing,
                    createNewsTaskDone : createNewsTaskDone,
                    createNewsValidateUserStory : createNewsValidateUserStory,
                    createNewsEndOfSprint : createNewsEndOfSprint
                });
            }]);