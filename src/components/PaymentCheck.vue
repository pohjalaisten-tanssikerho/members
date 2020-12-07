<template>
  <div class="item" v-for="member in members" :key="member.email">

    <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
    <!-- <div class="price">{{ price(member.membership[0]) }}</div> -->
    <!-- <div class="reference">{{ reference(member.membership[0]) }}</div> -->
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
