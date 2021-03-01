export function chartDataPie(student, club, studentAndClub, other, labels) {
  return {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        { 
          data: [student, club, studentAndClub, other],
          backgroundColor: [
            'rgba(54,73,93,.5)', 
            'rgba(71,183,132,.5)',
            'rgba(60,54,94,.5)',
            'rgba(94,54,54,.5)',
          ],
          borderColor: [
            '#36495d',
            '#47b784',
            '#3c365e',
            '#5e3636',
          ],
          borderWidth: 3
        },
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      legend: {
        align: 'start',
        labels: {
          fontColor: '#e9f3ff',
        },
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          }
        }],
        yAxes: [{
          gridLines: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
            padding: 25,
          }
        }]
      }
    }
  }
}

export default chartDataPie
