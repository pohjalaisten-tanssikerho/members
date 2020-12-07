<template>

  <nav class="secondary">
    <a href="" @click.prevent="$emit('togglemodal', 'non-paid-mails')">Ei maksaneiden sähköpostit</a>
  </nav>

  <div id="non-paid-mails" class="hidden modal">
    <button @click="$emit('togglemodal', 'non-paid-mails')">sulje</button>
    <button @click="copyToClipboard">kopioi leikepöytään</button>
    <div class="mail-list">
      <p>Sähköpostia lähettäessäsi sähköpostien osoitteet tulee kirjoittaa BCC-kenttään ja TO-kenttään oma osoitteesi, eli osoite mistä sähköpostia lähetetään. Painamalla nappulaa "kopioi leikepöytään" voit helposti kopioida kaikki osoitteet.</p>
      <textarea id="copyToClipboard" :value="allmails" readonly></textarea>
    </div>
  </div>

  <div class="item" v-for="member in members" :key="member.email">

    <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
    <div class="discount">{{ discounts(member.membership[0]) }}</div>
      <div class="course" :class="{ marginBottom : index, unpaid : !course.paid }" v-for="(course, index) in member.courses" :key="index">
        <button @click="togglePaid(course)" v-if="course.paid">poista maksu</button>
        <button @click="togglePaid(course)" v-else>merkitse maksu</button>
        <div class="left-padding">{{ price(member.membership[0]) }}</div>
        <div class="left-padding">viite</div>

        <div class="" v-if="course.courseId == 'alkeetOma'">alkeet omalla parilla</div>
        <div class="" v-if="course.courseId == 'alkeet'">alkeet</div>
        <div class="" v-if="course.courseId == 'alkeisjatko'">jatko</div>
        <div class="" v-if="course.courseId == 'jatko'">jatko</div>
        <div class="" v-if="course.courseId == 'kannatus'">kannatusjäsen</div>

      </div>

  </div>
</template>

<script>
export default {

  name: 'PaymentCheck',
  props: ['members'],
  data() {
    return {
      allmails: ''
    }
  },
  computed: {
  },
  methods: {
    discounts: function(membership) {
      let discountMessage = ' '
      if (membership.student) discountMessage = discountMessage + 'opiskelija '
      if (membership.club) discountMessage = discountMessage + 'osakuntalainen'
      return discountMessage
    },
    price: function(membership) {
      console.log(membership)
      return '40€'
    },
    reference: function(membership) {
      console.log(membership)
      return '0033'
    },
    togglePaid: function(course) { 
      console.log(course)
      course.paid = course.paid ? false : true
    }
  },
  mounted: function() {
    const nonPaidMembers = new Set()
    this.members.forEach(member => {
      member.courses.forEach(course => {
        if (!course.paid) {
          nonPaidMembers.add(member.email)
          // if (nonPaidMembers.indexOf(member.mail) !== -1) nonPaidMembers.push(member.email)
          // console.log(nonPaidMembers.indexOf('leo.dicaprio@mahti.org'))
          // nonPaidMembers.push(member.email)
        } 
      })
    })
    console.log(nonPaidMembers)
  }
}

</script>

<style lang="scss" scoped>

$button-width: 120px;

.item {
  display: grid;
  grid-template-columns: 180px auto;
  grid-template-rows: auto;
  background: lightgray;
  max-width: 400px;
  margin: .2em auto;
  padding: .3em;
  border-radius: 3px;
  background-color: lightgray;
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
  }
  .course {
    grid-column: span 2;
    display: grid;
    grid-template-columns: $button-width 50px 50px auto ; 
    padding: 0;
    button {
      border: none;
      width: $button-width;
      border: solid 1px white;
      outline: none;
      /* margin-left: auto; */
    }
    div {
      padding-left: .8em;
    }
  }
}

/* utilities */

.marginBottom {
  margin-top: .2em;
}

.unpaid {
  background: pink,
}

.warning {
  background: red;
}

.hidden {
  display: none;
}


</style>
