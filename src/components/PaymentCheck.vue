<template>

  <div v-if="prices" :prices="prices">

    <nav class="secondary">
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
        <button @click="togglePaid(course)" v-if="course.paid">poista maksu</button>
        <button @click="togglePaid(course)" v-else>merkitse maksu</button>
        <div class="left-padding">{{ payment(member.membership[0], course, 'price')}}</div>
        <div class="left-padding">{{ payment(member.membership[0], course, 'ref')}}</div>

        <div class="" v-if="course.courseId == 'alkeetOma'">alkeet omalla parilla</div>
        <div class="" v-if="course.courseId == 'alkeet'">alkeet</div>
        <div class="" v-if="course.courseId == 'alkeisjatko'">jatko</div>
        <div class="" v-if="course.courseId == 'jatko'">jatko</div>
        <div class="" v-if="course.courseId == 'kannatus'">kannatusjäsen</div>

      </div>
    </div>
  </div>

  <div v-else :pricess="prices">Ladataan hinnastoa...</div>

</template>

<script>
// import axios from 'axios'
// import VueAxios from 'vue-axios'

export default {

  name: 'PaymentCheck',
  props: ['members'],
  data() {
    return {
      allmails: null,
      prices: {
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
    payment: function(membership, course, display) {

      let memberDiscount = null
      if (membership.club && membership.student) memberDiscount = 'osakuntalainen'
      else if (membership.student) memberDiscount = 'opiskelija'
      else memberDiscount = 'muut'
      console.log(display, memberDiscount, courseDiscount)

      let courseDiscount = 0
      if (course.courseId == 'alkeetOma' || course == 'alkeet') courseDiscount = 0
      else if (course.courseId == 'alkeisjatko') courseDiscount = 1
      else if (course.courseId == 'jatko') courseDiscount = 2
      else if (course.courseId == 'kannatus') {
        if (display == 'price') return course.amount +'€'
        else if (display == 'ref') return '9991'
      } 

      console.log('viimeinen: ')
      console.log(this.prices['osakuntalainen'][0].price)
      console.log(memberDiscount == 'osakuntalainen')
      if(courseDiscount <= 2 && courseDiscount >= 0) {
        return this.prices[memberDiscount][courseDiscount][display]
      }


      // console.log(courseDiscount)
      // setTimeout(() => {
      //   console.log(this.prices[memberDiscount][0])
      // }, 4000)
      // console.log('onnistuiko viimein?')
      // console.log(this.prices[memberDiscount])
      // let foo = this.prices[memberDiscount]
      // console.log(foo)
      // console.log(this.prices[memberDiscount][0])

      // console.log(courseDiscount)
      // console.log(memberDiscount)
        // return this.prices[memberDiscount][courseDiscount]
      // return this.prices['osakuntalainen']

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
        } 
      })
    })
    this.allmails = [...nonPaidMembers].toString()
    // axios
    //   .get('https://raw.githubusercontent.com/pohjalaisten-tanssikerho/web-page/master/data/prices.json')
    //     .then(response => {
    //       console.log('Ensimmäinen kutsu: ', this.prices)
    //       this.prices = response.data
    //       console.log('Toinen kutsu: ', this.prices)
    //       this.prices.osakuntalainen = response.data.osakuntalainen
    //       console.log('Kolmas kutsu: ', this.prices['osakuntalainen'])
    //     })
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
