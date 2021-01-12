export class Bar {
  constructor(labels, values) {
    this.labels = labels
    this.values = values
    console.log(labels)
    console.log(values)
  }
  get data() {
    return {
      type: 'bar',
      data: {
        // labels: 'viejät',
        datasets: [
          { // one line graph
            label: this.labels[0],
            data: [this.values[0]],
            backgroundColor: [
              'rgba(54,73,93,.5)', 
            ],
            borderColor: [
              '#36495d',
            ],
            borderWidth: 3
          },
          { // another bar
            label: this.labels[1],
            data: [this.values[1]],
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
              padding: 25,
            }
          }]
        }
      }
    }
  }
}

export default Bar
