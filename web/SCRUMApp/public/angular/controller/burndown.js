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
                for (var i = 0; i <= response.data.nb_sprint; i++) {
                    sprints.push("sprint " + i);
                    nbSprints.push(i + 1);
                }

                Projects.getProjectUserstories(project_id).then(function (userstories) {
                    var lastSprintCostSum = 0;
                    var total_cost =0;
                    for (userstory of userstories) {
                        total_cost += userstory.cost;
                    }
                    sumOfCostBySprint[0] = total_cost;
                    realData[0] = total_cost;

                    for (i = 0; i < nbSprints.length; i++) {
                        for (userstory of userstories) {
                            if (userstory.sprint.number_sprint == nbSprints[i]) {

                                if (sumOfCostBySprint[i + 1] == undefined)
                                    sumOfCostBySprint[i + 1] = 0;
                                if (realData[i + 1] == undefined)
                                    realData[i + 1] = 0;

                                if (userstory.state == "Valid"){
                                    console.log(userstory);
                                    realData[i + 1] += userstory.cost;
                                }
                                sumOfCostBySprint[i + 1] += userstory.cost;
                            }
                        }
                        if (i+1 < nbSprints.length){
                            sumOfCostBySprint[i + 1] = sumOfCostBySprint[i] - sumOfCostBySprint[i + 1];
                            realData[i + 1] = realData[i] - realData[i + 1];
                        }

                    }

                    if (lastSprintCostSum == realData[realData.length - 1])
                        realData[realData.length - 1] = 0;

                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
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
                                    data: sumOfCostBySprint,
                                    spanGaps: false
                                },
                                {
                                    label: "real",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,33,192,0.4)",
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
