angular.module('Burndown', [])
    .controller('BurnDownController', ['$scope', '$routeParams', 'Projects', 'AuthService', 'UserStoriesServices',
        function ($scope, $routeParams, Projects, UserStoriesServices) {

            var project_id = $routeParams.project_id;
            var sprints = [];
            var nbSprints = [];
            var realData = [];
            var sumOfCostBySprint = [];

            var ctx = document.getElementById('myChart');

            Projects.get(project_id).then(function (response) {
                for (var i = 0; i < response.data.nb_sprint; i++) {
                    sprints.push("sprint "+i);
                    nbSprints.push(i + 1);
                }

                Projects.getProjectUserstories(project_id).then(function (response) {
                    sumOfCostBySprint[0] = 0;
                    for (var i = 0; i < nbSprints.length; i++) {
                        for (value of response) {
                            if (value.sprint.number_sprint == nbSprints[i]) {
                                if (sumOfCostBySprint[i + 1] == undefined)
                                    sumOfCostBySprint[i + 1] = 0;
                                sumOfCostBySprint[0] += value.cost;
                                sumOfCostBySprint[i + 1] += value.cost;
                                sumOfCostBySprint[nbSprints.length-1]=0;
                            }
                        }
                    }

                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            // labels: ["sprint 0","sprint 1","sprint 2","sprint 3"],
                            labels: sprints,
                            datasets: [
                                {
                                    label: "expected",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,192,192,0.4)",
                                    borderColor: "rgba(75,192,192,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    // data: [90, 72, 54, 0],
                                    data: sumOfCostBySprint,
                                    spanGaps: false
                                },
                                {
                                    label: "real",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,0,192,0.4)",
                                    borderColor: "rgba(75,0,192,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75,0,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,0,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    //data: [96, 82, 70, 34],
                                    data: realData,
                                    spanGaps: false
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'BurnDown Chart'
                            }
                        }
                    });

                });


            });

        }]);
