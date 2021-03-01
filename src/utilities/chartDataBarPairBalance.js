export function chartDataBarPairBalance(leaderAmount, followerAmount, labelsInput) {
  const leaders = leaderAmount
  const followers = followerAmount
  const labels = (labels === undefined) ? ' ' : labelsInput
  return {
    type: 'bar',
    data: {
      labels: ['rooli'],
      datasets: [
        { 
          label: 'viejät',
          data: [leaders],
          backgroundColor: [
            'rgba(54,73,93,.5)', 
          ],
          borderColor: [
            '#36495d',
          ],
          borderWidth: 3
        },
        { 
          label: 'seuraajat',
          data: [followers],
          backgroundColor: [
            'rgba(71, 183,132,.5)',
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
      legend: {
        labels: {
          fontColor: '#e9f3ff',
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
            padding: 25,
          }
        }]
      }
    }
  }
}

export default chartDataBarPairBalance
