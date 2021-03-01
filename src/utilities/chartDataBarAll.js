export function chartDataBarAll(alkeet, alkeetOma, alkeisjatko, jatko, label) {
  return {
    type: 'bar',
    data: {
      labels: ['alkeet', 'alkeet oma', 'alkeisjatko', 'jatko'],
      datasets: [
        { 
          label: label,
          data: [alkeet, alkeetOma, alkeisjatko, jatko],
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
        display: false,
      },
      scales: {
        xaxes: [{
          gridLines: {
            drawBorder: true,
          },
          ticks: {
            display: true,
          }
        }],
        yAxes: [{
          gridLines: {
            drawBorder: true,
            display: true,
          },
          ticks: {
            display: true,
            padding: 25,
            beginAtZero: true,
          }
        }]
      }
    }
  }
}
export default chartDataBarAll
