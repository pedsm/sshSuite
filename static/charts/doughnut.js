function makeMemChart(array){
    var ctx = document.getElementById("doughnut").getContext('2d');
    var doughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Used Memory", "Available Memory"],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                    "#cc0000",
                ],
                data: array
            }]
        }
    });
    return doughnut;
}

function makeCpuChart(array){
    var ctx = document.getElementById("lineGraph").getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {datasets:[{data:array}]}
    });
    return lineChart;
}

function displayLineChart() {
    var ctx = document.getElementById("lineGraph").getContext("2d");
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: "Prime and Fibonacci",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                }
            ]
        }
    });
}
