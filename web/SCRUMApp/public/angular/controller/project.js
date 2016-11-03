//angular modules
angular.module('Project', [])
    .controller('ProjectController', ['$scope', '$routeParams','$location','$http', 'Projects',
                                            function($scope, $routeParams,$location,$http,Projects) {

        $scope.params = $routeParams;
        $scope.new_project = {};
      /*  if ( $scope.params.project_id == undefined){
            throw "no project_id given"
        }*/
    /*
        $http.get('/api/project/' + $scope.params.project_id, function (req, res) {
            $scope.project = res.data;
        });
    */
        $scope.project = $scope.project = {
            'id': 1,
            'name' : "My Awesome Project",
            'description' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat mattis cursus. In vel aliquam ligula. Suspendisse eros odio, facilisis imperdiet tempus sed, cursus sit amet felis. Sed elementum pretium erat et laoreet. Phasellus gravida ante in maximus ornare. Vestibulum lacinia sapien nec turpis interdum rhoncus. Etiam placerat urna sit amet justo molestie, eget ornare mauris sollicitudin. Nunc ac nisl nunc. Morbi",
            'date_start' : new Date(),
            'sprint_duration' : 7,
            'product_owner' : {
                'username' : "toto",
                'image' : '/public/images/github.png'
            },
            'member_list' : [{
                'username' : "toto",
                'image' : '/public/images/github.png'
            },{
                'username' : "tata",
                'image' : '/public/images/github.png'
            }],

        };


        $scope.getProject = function(){
          Projects.get($scope.params.project_id)
              .success(function(data){
                $scope.project = data;
            })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
        };

        $scope.createProject= function() {
            Projects.create($scope.new_project )
                .success(function(data) {
                    $scope.new_project = {}; // clear the form so our user is ready to enter another
                    $scope.project = data;
                    $location.path( '/project/'+$scope.project.id );
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.deleteProject= function() {
            Projects.delete($scope.project_id)
                .success(function(data) {
                    $scope.project = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.updateProject= function() {
            Projects.update($scope.project)
                .success(function(data) {
                    $scope.project = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

    }]);