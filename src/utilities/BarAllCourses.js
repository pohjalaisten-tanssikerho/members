
import Chart from 'chart.js'

export class BarAllCourses {
  constructor(alkeet, alkeetOma, alkeisjatko, jatko, target) {
    this.alkeet = alkeet
    this.alkeetOma = alkeetOma
    this.alkeisjatko = alkeisjatko
    this.jatko = jatko
    this.target = target
  }
  draw() {
    const ctx = document.getElementById(this.target);
    new Chart(ctx, {
      type: this.data.type,
      data: this.data.data,
      options: this.data.options,
    });
  }
  get data() {
    return {
      type: 'bar',
      data: {
        labels: ['alkeet', 'alkeet oma', 'alkeisjatko', 'jatko'],
        datasets: [
          { 
            label: 'kurssilaisia',
            data: [this.alkeet, this.alkeetOma, this.alkeisjatko, this.jatko ,0],
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
          xAxes: [{
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
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
              padding: 25,
            }
          }]
        }
      }
    }
  }
}

export default BarAllCourses
