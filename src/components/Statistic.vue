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
import BarPairBalance from '../utilities/BarPairBalance.js'
import Pie from '../utilities/Pie.js'
import StatisticGeneral from './StatisticGeneral.vue'
import BarAllCourses from '../utilities/BarAllCourses.js'
import { onMounted, computed, watch } from 'vue'

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
          muu: 0,
        },
        membership: {
          student: 0,
          club: 0,
          studentAndClub: 0,
          other: 0,
        }
      }
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

          courseId.hometown[member.hometown.toLowerCase()]++
          all.hometown[member.hometown.toLowerCase()]++

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
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }

    const createPairBalance = function(memberData, target) {
      const memberPairBalanceLabels = ['viejä', 'seuraaja']
      const memberBar = new BarPairBalance(memberData.leader, memberData.follower, memberPairBalanceLabels)
      createChart(target, memberBar.data)
    }
    const createMemberPie = function(memberData, target) {
      const memberStatusLabels = ['opiskelija' , 'osakuntalainen', 'opiskelija ja osakuntalainen', 'muu']
      const { student, club, studentAndClub, other } = memberData.membership
      const memberPie = new Pie(student, club, studentAndClub, other, memberStatusLabels)
      createChart(target, memberPie.data)
    }
    const createHometownPie = function(memberData, target) {
      const memberHometownLabels = ['Helsinki                   ', 'Espoo              ', 'Vantaa                        ', 'muu']
      const { helsinki, espoo, vantaa, other } = memberData.hometown
      const hometownPie = new Pie(helsinki, espoo, vantaa, other, memberHometownLabels)
      createChart(target, hometownPie.data)
    }

    const barAllIncome = new BarAllCourses(
      (statistic.value.alkeet.totalAmount), 
      (statistic.value.alkeetOma.totalAmount), 
      (statistic.value.alkeisjatko.totalAmount), 
      (statistic.value.jatko.totalAmount), 
      'all-income')

    const barAllCourses = new BarAllCourses(
      (statistic.value.alkeet.leader + statistic.value.alkeet.follower), 
      (statistic.value.alkeetOma.leader + statistic.value.alkeetOma.follower),
      (statistic.value.alkeisjatko.leader + statistic.value.alkeisjatko.follower),
      (statistic.value.jatko.leader + statistic.value.jatko.follower),
      'all-courses')

    function drawAll() {
        createPairBalance(statistic.value.alkeet, 'alkeet-pair-balance')
        createPairBalance(statistic.value.alkeetOma, 'alkeetOma-pair-balance')
        createPairBalance(statistic.value.alkeisjatko, 'alkeisjatko-pair-balance')
        createPairBalance(statistic.value.jatko, 'jatko-pair-balance')
        createPairBalance(statistic.value.all, 'all-pair-balance')

        createMemberPie(statistic.value.alkeet, 'alkeet-member-status')
        createMemberPie(statistic.value.alkeetOma, 'alkeetOma-member-status')
        createMemberPie(statistic.value.alkeisjatko, 'alkeisjatko-member-status')
        createMemberPie(statistic.value.jatko, 'jatko-member-status')
        createMemberPie(statistic.value.all, 'all-member-status')

        createHometownPie(statistic.value.alkeet, 'alkeet-hometown')
        createHometownPie(statistic.value.alkeetOma, 'alkeetOma-hometown')
        createHometownPie(statistic.value.alkeisjatko, 'alkeisjatko-hometown')
        createHometownPie(statistic.value.jatko, 'jatko-hometown')
        createHometownPie(statistic.value.all, 'all-hometown')

        barAllCourses.draw()
        barAllIncome.draw()
    }

    onMounted(() => {
      watch(statistic, () => {
        drawAll()
      })
      drawAll()
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
