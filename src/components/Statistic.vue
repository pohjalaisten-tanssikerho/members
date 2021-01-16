<template>
  {{ alkeetIncome.paid }}
  <h1>Kaikki kurssit</h1>
  <div class="charts">
    <div class="card">
      <h2>Yleistä</h2>
      <StatisticGeneral
        :total="allCourseStatistic.follower + allCourseStatistic.leader"
        :income="allCourseStatisticIncome"
        :payment="allCourseStatistic.payment"
      />
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
      <h2>Kurssijakauma</h2>
      <canvas id="all-courses" height="150"></canvas>
    </div>
  </div>

  <h1>Alkeet</h1>

  <div class="charts">
    <div class="card">
      <h2>Yleistä</h2>
      <StatisticGeneral
        :total="alkeet.follower + alkeet.leader"
        :income="alkeetIncome"
        :payment="alkeet.payment"
      />
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
      <StatisticGeneral
        :total="alkeetOma.follower + alkeetOma.leader"
        :income="alkeetOmaIncome"
        :payment="alkeetOma.payment"
      />
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
      <StatisticGeneral
        :total="alkeisjatko.follower + alkeisjatko.leader"
        :income="alkeisjatkoIncome"
        :payment="alkeisjatko.payment"
      />
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
      <StatisticGeneral
        :total="jatko.follower + jatko.leader"
        :income="jatkoIncome"
        :payment="jatko.payment"
      />
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
</template>

<script>

import Chart from 'chart.js'
import BarPairBalance from '../utilities/BarPairBalance.js'
import CourseStatistic from '../utilities/CourseStatistic.js'
import Pie from '../utilities/Pie.js'
import StatisticGeneral from './StatisticGeneral.vue'
import BarAllCourses from '../utilities/BarAllCourses.js'
import { onMounted, reactive } from 'vue'

export default {
  components: { StatisticGeneral },
  props: {
    members: Array,
  },
  setup(props) {

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

    async function getPrices() {
      const response = await fetch('https://raw.githubusercontent.com/pohjalaisten-tanssikerho/web-page/master/data/prices.json')
      const prices = await response.json()
      return prices
    }

    const alkeetIncome = reactive({ paid: 0, total: 0, })
    const alkeetOmaIncome = reactive({ paid: 0, total: 0, })
    const alkeisjatkoIncome = reactive({ paid: 0, total: 0, })
    const jatkoIncome = reactive({ paid: 0, total: 0, }) 
    const allCourseStatisticIncome = reactive({ paid: 0, total: 0, }) 

    getPrices().then(prices => {
      props.members.forEach( member => {
        member.courses.forEach( course => {
          let amount = 0
          switch(course.courseId) {
            case 'alkeet':
              amount = parseInt(getPrice(member.membership[0], course.courseId, prices))
              if (course.paid) { alkeetIncome.paid += amount }
              alkeetIncome.total += amount
              break
            case 'alkeetOma':
              amount = parseInt(getPrice(member.membership[0], course.courseId, prices))
              if (course.paid) { alkeetOmaIncome.paid += amount }
              alkeetOmaIncome.total += amount
              break
            case 'alkeisjatko':
              amount = parseInt(getPrice(member.membership[0], course.courseId, prices))
              if (course.paid) { alkeisjatkoIncome.paid += amount }
              alkeisjatkoIncome.total += amount
              break
            case 'jatko':
              amount = parseInt(getPrice(member.membership[0], course.courseId, prices))
              if (course.paid) { jatkoIncome.paid += amount }
              jatkoIncome.total += amount
              break
          }
        })
      })

      const allCourseIncome = [alkeetIncome, alkeetOmaIncome, alkeisjatkoIncome, jatkoIncome]
      allCourseIncome.forEach( course => {
        allCourseStatisticIncome.paid += course.paid
        allCourseStatisticIncome.total += course.total
      })
    })

    const addToHomeTown = function (member, course) {
      switch(member.hometown) {
        case 'Helsinki':
          course.hometown.helsinki++
          break
        case 'Vantaa':
          course.hometown.vantaa++
          break
        case 'Espoo':
          course.hometown.espoo++
          break
        default: 
          course.hometown.other++
      }
    }

    const addToStudentStatus = function (student, club, course){
      if (student && club) course.membership.studentAndClub++
      else if (student && !club) course.membership.student++
      else if (!student && club) course.membership.support++
      else if (!student && !club) course.membership.other++
    }

    const addToRole = function(role, course) {
      if (role === 'leader') course.leader++
      else if (role === 'follower') course.follower++
    }

    const addToPayment = function(paid, course) {
      if (paid) {
        course.payment.personPaid++
        course.payment.total++
      }  else course.payment.total++
    }

    const alkeet = new CourseStatistic('alkeet')
    const alkeetOma = new CourseStatistic('alkeetOma')
    const alkeisjatko = new CourseStatistic('alkeisjatko')
    const jatko = new CourseStatistic('jatko')

    props.members.forEach( member => {
      member.courses.forEach( course => {
        switch(course.courseId) {
          case 'alkeet':
            addToHomeTown(member, alkeet)
            addToStudentStatus(member.membership[0].student, member.membership[0].club, alkeet)
            addToRole(course.role, alkeet)
            addToPayment(course.paid, alkeet)
            break
          case 'alkeetOma':
            addToHomeTown(member, alkeetOma)
            addToStudentStatus(member.membership[0].student, member.membership[0].club, alkeetOma)
            addToRole(course.role, alkeetOma)
            addToPayment(course.paid, alkeetOma)
            break
          case 'alkeisjatko':
            addToHomeTown(member, alkeisjatko)
            addToStudentStatus(member.membership[0].student, member.membership[0].club, alkeisjatko)
            addToRole(course.role, alkeisjatko)
            addToPayment(course.paid, alkeisjatko)
            break
          case 'jatko':
            addToHomeTown(member, jatko)
            addToStudentStatus(member.membership[0].student, member.membership[0].club, jatko)
            addToRole(course.role, jatko)
            addToPayment(course.paid, jatko)
            break
        }
      })
    })

    const allCourseStatistic = new CourseStatistic('all')

    const courses = [alkeet, alkeetOma, alkeisjatko, jatko]
    courses.forEach( course => {
      allCourseStatistic.leader += course.leader
      allCourseStatistic.follower += course.follower
      allCourseStatistic.membership.student += course.membership.student
      allCourseStatistic.membership.club += course.membership.club
      allCourseStatistic.membership.studentAndClub += course.membership.studentAndClub
      allCourseStatistic.membership.other += course.membership.other
      allCourseStatistic.hometown.helsinki += course.hometown.helsinki
      allCourseStatistic.hometown.espoo += course.hometown.espoo
      allCourseStatistic.hometown.vantaa += course.hometown.vantaa
      allCourseStatistic.hometown.other += course.hometown.other
      allCourseStatistic.payment.personPaid += course.payment.personPaid
      allCourseStatistic.payment.total += course.payment.total
    })

    function createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }

    const barAllCourses = new BarAllCourses(
      (alkeet.leader + alkeet.follower), 
      (alkeetOma.leader + alkeetOma.follower),
      (alkeisjatko.leader + alkeisjatko.follower),
      (jatko.leader + jatko.follower),
      'all-courses')

    onMounted(() => {

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

      createPairBalance(alkeet, 'alkeet-pair-balance')
      createPairBalance(alkeetOma, 'alkeetOma-pair-balance')
      createPairBalance(alkeisjatko, 'alkeisjatko-pair-balance')
      createPairBalance(jatko, 'jatko-pair-balance')
      createPairBalance(allCourseStatistic, 'all-pair-balance')

      createMemberPie(alkeet, 'alkeet-member-status')
      createMemberPie(alkeetOma, 'alkeetOma-member-status')
      createMemberPie(alkeisjatko, 'alkeisjatko-member-status')
      createMemberPie(jatko, 'jatko-member-status')
      createMemberPie(allCourseStatistic, 'all-member-status')

      createHometownPie(alkeet, 'alkeet-hometown')
      createHometownPie(alkeetOma, 'alkeetOma-hometown')
      createHometownPie(alkeisjatko, 'alkeisjatko-hometown')
      createHometownPie(jatko, 'jatko-hometown')
      createHometownPie(allCourseStatistic, 'all-hometown')

      barAllCourses.draw()

    }) 

    return { 
      allCourseStatistic, 
      alkeet, 
      alkeetOma, 
      alkeisjatko, 
      jatko,
      alkeetIncome,
      alkeetOmaIncome,
      alkeisjatkoIncome,
      jatkoIncome,
      allCourseStatisticIncome
    }

  },
}
</script>

<style lang="scss" scoped>

$white: #e9f3ff;
$orange: #fb9039;
$blue: #062f4f;
$lightblue: #0b3c5d;
$neonblue: #009fff;
$nightblue: #022140;
$tintblue: #05386b;
$opacity-half: rgba(0, 0, 0, 0.47);


* {
  color: $white;
}

h1 {
  color: $white;
}

.charts {
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: space-between;
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
