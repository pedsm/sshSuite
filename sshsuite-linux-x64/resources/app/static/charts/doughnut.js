function makeMemChart(array){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Used Memory", "Available Memory"],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                    "#95a5a6"
                ],
                data: array
            }]
        }
    });
}
