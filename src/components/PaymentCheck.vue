<template>

  <div class="margin-bottom" v-if="prices" :prices="prices">

    <nav class="nav-secondary">
      <a href="" @click.prevent="$emit('togglemodal', 'non-paid-mails')">Ei maksaneiden sähköpostit</a>
    </nav>

    <div id="non-paid-mails" class="hidden modal">
      <button @click="$emit('togglemodal', 'non-paid-mails')">sulje</button>
      <button @click="$emit('copy-to-clipboard', 'copyToClipboard')">kopioi leikepöytään</button>
      <span id="copyMessage" class="hidden sm">ok</span>
      <div class="mail-list">
        <p>Sähköpostia lähettäessäsi sähköpostien osoitteet tulee kirjoittaa BCC-kenttään ja TO-kenttään oma osoitteesi, eli osoite mistä sähköpostia lähetetään. Painamalla nappulaa "kopioi leikepöytään" voit helposti kopioida kaikki osoitteet.</p>
        <textarea id="copyToClipboard" :value="allmails" readonly></textarea>
      </div>
    </div>

    <div class="item" v-for="member in members" :key="member.email">

      <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
      <div class="discount">{{ discounts(member.membership[0]) }}</div>

      <div class="course" :class="{ marginBottom : index, unpaid : !course.paid }" v-for="(course, index) in member.courses" :key="index">
      <button @click="$emit('toggle-paid', course.courseId, member.id, course)" v-if="course.paid">poista maksu</button>
      <button @click="$emit('toggle-paid', course.courseId, member.id, course)" v-else>merkitse maksu</button>
      <div class="left-padding">{{ payment(member.membership[0], course, 'price')}}</div>
      <div class="left-padding">{{ payment(member.membership[0], course, 'ref')}}</div>

      <div v-if="course.courseId == 'alkeetOma'">alkeet omalla parilla</div>
      <div v-if="course.courseId == 'alkeet'">alkeet</div>
      <div v-if="course.courseId == 'alkeisjatko'">alkeisjatko</div>
      <div v-if="course.courseId == 'jatko'">jatko</div>
      <div v-if="course.courseId == 'kannatus'">kannatusjäsen</div>
      <div v-if="course.courseId == 'support'">kannatusjäsen</div>

      <div class="note-icon note-paid" v-if="course.paid">ok</div>
      <div class="note-icon note-not-paid" v-else>!</div>

      </div>
    </div>
  </div>

  <div v-else :pricess="prices">
    <p>Ladataan hintataulukkoa...</p>
  </div>

</template>

<script>
import axios from 'axios'

export default {

  name: 'PaymentCheck',
  props: ['members'],
  data() {
    return {
      allmails: null,
      prices: null
    }
  },
  methods: {
    discounts: function(membership) {
      let discountMessage = ' '
      if (membership.student) discountMessage = discountMessage + 'opiskelija '
      if (membership.club) discountMessage = discountMessage + 'osakuntalainen'
      return discountMessage
    },
    payment: function(membership, course, display) {

      let memberDiscount = null
      if (membership.club && membership.student) memberDiscount = 'osakuntalainen'
      else if (membership.student) memberDiscount = 'opiskelija'
      else memberDiscount = 'muut'

      let courseDiscount = 0
      if (course.courseId == 'alkeetOma' || course == 'alkeet') courseDiscount = 0
      else if (course.courseId == 'alkeisjatko') courseDiscount = 1
      else if (course.courseId == 'jatko') courseDiscount = 2
      else if (course.courseId == 'kannatus') {
        if (display == 'price') return course.amount +'€'
        else if (display == 'ref') return '9991'
      } 

      if(courseDiscount <= 2 && courseDiscount >= 0) {
        return this.prices[memberDiscount][courseDiscount][display]
      }

    },
    togglePaid: function(course) { 
      course.paid = course.paid ? false : true
    }
  },
  mounted: function() {
    const nonPaidMembers = new Set()
    this.members.forEach(member => {
      member.courses.forEach(course => {
        if (!course.paid) {
          nonPaidMembers.add(member.email)
        } 
      })
    })
    this.allmails = [...nonPaidMembers].toString()
    axios
      .get('https://raw.githubusercontent.com/pohjalaisten-tanssikerho/web-page/master/data/prices.json')
        .then(response => this.prices = response.data )
  }
}

</script>

<style lang="scss" scoped>

$button-width: 130px;

.item {
  display: grid;
  grid-template-columns: 220px auto;
  grid-template-rows: auto;
  background: $opacity-half;
  max-width: 500px;
  margin: .2em auto;
  padding: .3em;
  .discount {
    text-align: right;
    height: 1.5em;
  }
  .fullname {
    height: 1.5em;
  }
  div {
    padding: .2em;
    text-align: left;
    color: white;
  }
  .course {
    grid-column: span 2;
    display: grid;
    grid-template-columns: $button-width 50px 50px 170px auto ; 
    padding: 0;
    button {
      border: none;
      width: $button-width;
      border: solid 1px $tintblue;
      background-color: $nightblue;
      color: $white;
      outline: none;
    }
    div {
      padding-left: .8em;
    }
    .note-icon {
      text-align: right;
      padding-right: .2rem;
    }
    .note-not-paid {
      font-weight: bold;
      color: $orange;
    }
  }
}

/* utilities */

.marginBottom {
  margin-top: .2em;
}

</style>
