<template>
  <div class="content">
    <h1>Kaikki kurssit</h1>
    <div class="charts">
      <div class="card">
        <h2>Yleistä</h2>
        <StatisticGeneral :statistic="statistic.all" />
      </div>
      <div class="card">
        <h2>Opiskelija status</h2>
        <canvas id="all-member-status" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Asuinpaikkakunta</h2>
        <canvas id="all-hometown" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Paritasapaino</h2>
        <canvas id="all-pair-balance" height="300"></canvas>
      </div>
      <div class="card grid-span-2">
        <h2>Kurssijakauma osallistujien mukaan</h2>
        <canvas id="all-courses" height="150"></canvas>
      </div>
      <div class="card grid-span-2">
        <h2>Tuotot euroissa</h2>
        <canvas id="all-income" height="150"></canvas>
      </div>
    </div>

    <h1>Alkeet</h1>
    <div class="charts">
      <div class="card">
        <h2>Yleistä</h2>
        <StatisticGeneral :statistic="statistic.alkeet" />
      </div>
      <div class="card">
        <h2>Opiskelija status</h2>
        <canvas id="alkeet-member-status" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Asuinpaikkakunta</h2>
        <canvas id="alkeet-hometown" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Paritasapaino</h2>
        <canvas id="alkeet-pair-balance" height="300"></canvas>
      </div>
    </div>

    <h1>Alkeet oman parin kanssa</h1>
    <div class="charts">
      <div class="card">
        <h2>Yleistä</h2>
        <StatisticGeneral :statistic="statistic.alkeetOma" />
      </div>
      <div class="card">
        <h2>Opiskelija status</h2>
        <canvas id="alkeetOma-member-status" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Asuinpaikkakunta</h2>
        <canvas id="alkeetOma-hometown" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Paritasapaino</h2>
        <canvas id="alkeetOma-pair-balance" height="300"></canvas>
      </div>
    </div>

    <h1>Alkeisjatko</h1>
    <div class="charts">
      <div class="card">
        <h2>Yleistä</h2>
        <StatisticGeneral :statistic="statistic.alkeisjatko" />
      </div>
      <div class="card">
        <h2>Opiskelija status</h2>
        <canvas id="alkeisjatko-member-status" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Asuinpaikkakunta</h2>
        <canvas id="alkeisjatko-hometown" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Paritasapaino</h2>
        <canvas id="alkeisjatko-pair-balance" height="300"></canvas>
      </div>
    </div>

    <h1>Jatko</h1>

    <div class="charts">
      <div class="card">
        <h2>Yleistä</h2>
        <StatisticGeneral :statistic="statistic.jatko" />
      </div>
      <div class="card">
        <h2>Opiskelija status</h2>
        <canvas id="jatko-member-status" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Asuinpaikkakunta</h2>
        <canvas id="jatko-hometown" height="300"></canvas>
      </div>
      <div class="card">
        <h2>Paritasapaino</h2>
        <canvas id="jatko-pair-balance" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>

import Chart from 'chart.js'
import StatisticGeneral from './StatisticGeneral.vue'
import chartDataBarPairBalance from '../utilities/chartDataBarPairBalance.js'
import chartDataBarAll from '../utilities/chartDataBarAll.js'
import chartDataPie from '../utilities/chartDataPie.js'
import { onMounted, onUnmounted, computed, watch } from 'vue'

export default {
  components: { StatisticGeneral },
  props: {
    members: Array,
  },
  setup(props) {

    const priceTable = {
      "osakuntalainen": [
        {
          "name": "alkeet",
          "price": "20€",
          "ref": "1012"
        },
        {
          "name": "alkeisjatko",
          "price": "40€",
          "ref": "1038"
        },
        {
          "name": "jatko",
          "price": "40€",
          "ref": "1041"
        }
      ],
      "opiskelija": [
        {
          "name": "alkeet",
          "price": "40€",
          "ref": "1119"
        },
        {
          "name": "alkeisjatko",
          "price": "60€",
          "ref": "1135"
        },
        {
          "name": "jatko",
          "price": "60€",
          "ref": "1148"
        }
      ],
      "muut": [
        {
          "name": "alkeet",
          "price": "80€",
          "ref": "1915"
        },
        {
          "name": "alkeisjatko",
          "price": "90€",
          "ref": "1931"
        },
        {
          "name": "jatko",
          "price": "90€",
          "ref": "1944"
        }
      ]
    }

    function getPrice(member, course, priceTable) {
      let memberDiscount = null
      if (member.club && member.student) memberDiscount = 'osakuntalainen'
      else if (member.student) memberDiscount = 'opiskelija'
      else memberDiscount = 'muut'

      let courseDiscount = 0
      if (course == 'alkeetOma' || course == 'alkeet') courseDiscount = 0
      else if (course == 'alkeisjatko') courseDiscount = 1
      else if (course == 'jatko') courseDiscount = 2

      return priceTable[memberDiscount][courseDiscount]['price']
    }

      const statistic = computed(() => {
        function createCourseStatistic() {
          return {
            total: 0,
            paid: 0,
            totalPaid: 0,
            totalAmount: 0,
            follower: 0,
            leader: 0,
            hometown: {
              helsinki: 0,
              espoo: 0,
              vantaa: 0,
              other: 0,
            },
            membership: {
              student: 0,
              club: 0,
              studentAndClub: 0,
              other: 0,
            }
          }
        }

        const all = createCourseStatistic()
        const alkeet = createCourseStatistic()
        const alkeetOma = createCourseStatistic()
        const alkeisjatko = createCourseStatistic()
        const jatko = createCourseStatistic()

        const addToCourse = (courseId, course, member) => {
          all.total++
          courseId.total++

          if (course.paid) {
            all.paid++
            courseId.paid++
          }

          if (['helsinki', 'vantaa', 'espoo'].indexOf(member.hometown.toLowerCase()) + 1) {
            courseId.hometown[member.hometown.toLowerCase()]++
            all.hometown[member.hometown.toLowerCase()]++
          } else {
            courseId.hometown.other++
            all.hometown.other++
          }

          if (member.membership[0].club && member.membership[0].student) {
            courseId.membership.studentAndClub++
            all.membership.studentAndClub++
          }  else if (!member.membership[0].club && !member.membership[0].student) {
            courseId.membership.other++
            all.membership.other++
          } else if (member.membership[0].club) {
            courseId.membership.club++
            all.membership.club++
          } else if (member.membership[0].student) {
            courseId.membership.student++
            all.membership.student++
          }

          courseId[course.role]++
          all[course.role]++

          const payment = parseInt(getPrice(member.membership[0], course.courseId, priceTable))

          if (course.paid) {
            courseId.totalPaid += payment
            courseId.totalAmount += payment
            all.totalPaid += payment
            all.totalAmount += payment
          } else {
            courseId.totalAmount += payment
            all.totalAmount += payment
          }
        }

        props.members.forEach( member => {
          member.courses.forEach( course => {
            switch(course.courseId) {
              case 'alkeet':
                addToCourse(alkeet, course, member)
                break
              case 'alkeetOma':
                addToCourse(alkeetOma, course, member)
                break
              case 'alkeisjatko':
                addToCourse(alkeisjatko, course, member)
                break
              case 'jatko':
                addToCourse(jatko, course, member)
                break
            }
          })
        })

        return {
          all: all,
          alkeet: alkeet,
          alkeetOma: alkeetOma,
          alkeisjatko: alkeisjatko,
          jatko: jatko,
        }
      }) 

    function createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      return new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      })
    }

    const getPairBalanceId = (courseId) => courseId + '-pair-balance'
    const getMemberId = (courseId) => courseId + '-member-status'
    const getHometownId = (courseId) => courseId + '-hometown'

    const courseIds = {
      all: 'all',
      alkeet: 'alkeet',
      alkeetOma: 'alkeetOma',
      alkeisjatko: 'alkeisjatko',
      jatko: 'jatko',
    }

    function createAllCharts() {
      const charts = new Array()

      Object.keys(courseIds).forEach( key => {
        charts.push(
          createChart(
            getPairBalanceId(courseIds[key]),
            chartDataBarPairBalance(
              statistic.value[key].leader,
              statistic.value[key].follower,
            )
          )
        )
        charts.push(
          createChart(
            getMemberId(courseIds[key]),
            chartDataPie(
              statistic.value[key].membership.student,
              statistic.value[key].membership.club,
              statistic.value[key].membership.studentAndClub,
              statistic.value[key].membership.other,
              ['opiskelija', 'osakuntalainen', 'opiskelija ja osakuntalainen', 'muu'],
            )
          )
        )
        charts.push(
          createChart(
            getHometownId(courseIds[key]),
            chartDataPie(
              statistic.value[key].hometown.helsinki,
              statistic.value[key].hometown.espoo,
              statistic.value[key].hometown.vantaa,
              statistic.value[key].hometown.other,
              ['Helsinki', 'Espoo', 'Vantaa', 'muu']
            )
          )
        )
      })
      charts.push(
        createChart(
          'all-courses',
          chartDataBarAll(
            statistic.value.alkeet.total,
            statistic.value.alkeetOma.total,
            statistic.value.alkeisjatko.total,
            statistic.value.jatko.total,
            'kurssilaisia',
          )
        )
      )
      charts.push(
        createChart(
          'all-income',
          chartDataBarAll(
            statistic.value.alkeet.totalAmount,
            statistic.value.alkeetOma.totalAmount,
            statistic.value.alkeisjatko.totalAmount,
            statistic.value.jatko.totalAmount,
            'tuotto',
          )
        )
      )

      return charts
    }

    let allCharts = ''

    onMounted(() => {
      allCharts = createAllCharts()
      watch(statistic, () => {
        allCharts.forEach( chart => 
          {
            chart.destroy()
            allCharts = createAllCharts()
          })
      })
      onUnmounted(() => {
        allCharts.forEach( chart => chart.destroy())
      })

    })

    return { 
      statistic,
    }

  },
}
</script>

<style lang="scss" scoped>

* {
  color: $white;
}

h1 {
  color: $white;
}

.charts {
  @media only screen and (min-width: 820px) {
    max-width: 590px;
  }
  @media only screen and (min-width: 1135px) {
    max-width: 900px;
  }
  @media only screen and (min-width: 1425px) {
    max-width: 1200px;
  }
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  div {
    border: 2px solid $lightblue;
    border-radius: 1em;
    background: $opacity-half;
  }
  .card {
    width: 250px;
    text-align: left;
    margin-bottom: 1rem;
    padding: 1rem;
    ul {
      list-style: none;
    }
  }
  .grid-span-2 {
    grid-column: span 2;
    width: 550px;
  }
  h2 {
    text-align: center;
  }
}

</style>
