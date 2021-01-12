export const barChart = {
  type: 'bar',
  data: {
    // labels: 'viejät',
    datasets: [
      { // one line graph
        label: 'Viejät',
        data: [24],
        backgroundColor: [
          'rgba(54,73,93,.5)', // Blue
        ],
        borderColor: [
          '#36495d',
        ],
        borderWidth: 3
      },
      { // another bar
        label: 'Seuraajat',
        data: [30],
        backgroundColor: [
          'rgba(71, 183,132,.5)', // Green
        ],
        borderColor: [
          '#47b784',
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25,
        }
      }]
    }
  }
}

export default barChart;
