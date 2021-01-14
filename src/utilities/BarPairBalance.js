export class Bar {
  constructor(leaderAmount, followerAmount, labels) {
    this.leaders = leaderAmount
    this.followers = followerAmount
    this.labels = (labels === undefined) ? ' ' : labels
  }
  get data() {
    return {
      type: 'bar',
      data: {
        datasets: [
          { 
            label: 'viejät',
            data: [this.leaders],
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
            data: [this.followers],
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
}

export default Bar
