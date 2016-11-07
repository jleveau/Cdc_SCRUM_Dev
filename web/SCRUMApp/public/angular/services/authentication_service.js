angular.module('AuthenticationService',[])
    .factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            // create user variable
            var user = null;

            function isLoggedIn() {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            }


            function getUserStatus() {
                return user;
            }

            //retrieve data using current
            function getCurrentUser(){
                if (user){
                   return getUserById(user._id);
                }
                return null;
            }

            //retrieve data for the user
            function getUserById(id){
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/users/info/' + id)
                // handle success
                    .success(function (data) {
                        if (data)
                          user = data;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            //Set id for logged user
            function getLoggedUser(){
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/users/logged')
                // handle success
                    .success(function (data) {

                        if (data)
                            user = {_id: data.id};
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        console.log(data);

                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            function login(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/users/login',
                    {username: username, password: password})
                // handle success
                    .success(function (data, status) {
                        if(status === 200 && data){
                            user = data;
                            deferred.resolve();
                        } else {
                            user = null;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/users/logout')
                // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password, mail) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/users/adduser',
                    {username: username, password: password, mail: mail})
                // handle success
                    .success(function (data, status) {
                        if(status === 200 && data){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getLoggedUser: getLoggedUser,
                getUserStatus: getUserStatus,
                getUserById: getUserById,
                login: login,
                logout: logout,
                register: register,
                getCurrentUser:getCurrentUser
            });

        }]);
