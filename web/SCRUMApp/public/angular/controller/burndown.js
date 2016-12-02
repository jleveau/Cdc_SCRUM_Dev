angular.module('Burndown', [])
    .controller('BurnDownController', ['$scope', '$routeParams', 'Projects', 'UserStoriesServices', 'SprintServices',
        function ($scope, $routeParams, Projects, UserStoriesServices, SprintServices) {

            var project_id = $routeParams.project_id;
            var sprints = [];
            var realData = [];
            var sumOfCostBySprint = [];
            var sprints_data;

            var ctx = document.getElementById('myChart');

            SprintServices.getProjectSprints(project_id).then(function(response){
                sprints_data = response;
                sprints_data = sprints_data.sort(function(a,b){
                    return a.number_sprint - b.number_sprint;
                });

                sprints.push("sprint " + 0);
                for (sprint of sprints_data){
                    sprints.push("sprint " + sprint.number_sprint);
                }

                Projects.getProjectUserstories(project_id).then(function (userstories) {
                    var lastSprintCostSum = 0;
                    var total_cost =0;
                    for (userstory of userstories) {
                        total_cost += userstory.cost;
                    }
                    sumOfCostBySprint[0] = total_cost;
                    realData[0] = total_cost;

                    for (sprint of sprints_data) {
                        if (sumOfCostBySprint[sprint.number_sprint] == undefined)
                            sumOfCostBySprint[sprint.number_sprint] = 0;
                        for (userstory of userstories) {
                            if (userstory.sprint.number_sprint == sprint.number_sprint) {

                                sumOfCostBySprint[sprint.number_sprint] += userstory.cost;
                            }
                        }
                        sumOfCostBySprint[sprint.number_sprint] = sumOfCostBySprint[sprint.number_sprint-1] - sumOfCostBySprint[sprint.number_sprint];
                    }

                    for (sprint of sprints_data) {
                        if (realData[sprint.number_sprint] == undefined)
                            realData[sprint.number_sprint] = 0;
                        for (userstory of userstories) {
                            if (userstory.state == "Valid" &&
                                new Date(userstory.date_validation) > new Date(sprint.date_start) &&
                                new Date(userstory.date_validation) < new Date(sprint.date_end)){
                                realData[sprint.number_sprint] += userstory.cost;
                            }
                        }
                        realData[sprint.number_sprint] = realData[sprint.number_sprint-1] - realData[sprint.number_sprint];
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
