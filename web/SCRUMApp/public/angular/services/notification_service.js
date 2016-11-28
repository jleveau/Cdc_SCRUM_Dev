angular.module('Notification')
    .factory('NotificationService',
        ['$q', '$timeout', '$http',
            function($q,$timeout,$http) {

                var notifications = [];

                function getNotifications(){
                    return notifications;
                }

                function getProjectsNotifications(projects){
                    return new Promise(function(resolve, reject){
                        i = 0;
                        for (project of projects){
                            $http.get('/api/project/'+ project._id +'/notifications').then(function(response){
                                console.log(notifications.length);
                                console.log(response.data.length);
                                notifications = notifications.concat(response.data);
                                console.log(notifications.length);

                                i++;
                                if (i >= projects.length){
                                    resolve();
                                }
                            });
                        }
                    });
                }

                function getUserNews(user){
                    notifications = [];
                    return $http.get('users/userprojects/' + user._id).then(function(response){
                        projects = response.data;
                        return getProjectsNotifications(projects);
                    });
                }

                function createNewsTaskOnGoing(task){
                    var notification = {
                        project : task.project_id._id,
                        author : task.responsable,
                        body : "<p>"+task.responsable.username + " has put Task#" + task.number_task+
                        "of project " + task.project_id.name + " on state OnGoing</p>"
                    };
                    return $http.post('/api/notifications/new',notification).then(function(response){
                        return response.data;
                    });
                }

                function createNewsTaskDone(task){
                    var project;
                    return $http.get('/api/project/' + task.id_project).then(function(response){
                        project = response.data;

                        var notification = {notification : {
                            project : project._id,
                            author : task.responsable,
                            body : "<p>"+task.responsable.username + " has finished Task#" + task.number_task +
                            " of project " + project.name+ "</p>"
                            }
                        };
                        return $http.post('/api/notifications/new',notification).then(function(response){
                            return response.data;
                        });
                    });
                }

                function createNewsValidateUserStory(userstory, user, project){
                    console.log(project);
                    return $http.get('/api/project/' + task.id_project).then(function(response) {
                        var notification = {notification : {
                            project: project,
                            author: user,
                            body: "<p>" + user.username + " has valide US#" + userstory.number_us +
                            " of project " + project.name + "</p>"
                        }};
                        console.log(notification);
                        return $http.post('/api/notifications/new', notification).then(function (response) {
                            return response.data;
                        });
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
                    getNotifications : getNotifications,
                    getUserNews : getUserNews,
                    createNewsTaskOnGoing : createNewsTaskOnGoing,
                    createNewsTaskDone : createNewsTaskDone,
                    createNewsValidateUserStory : createNewsValidateUserStory,
                    createNewsEndOfSprint : createNewsEndOfSprint
                });
            }]);