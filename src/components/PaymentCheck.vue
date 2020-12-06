<template>
  <div class="item" :class="{ unpaid : !member.paid }" v-for="member in members" :key="member.email">
    <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
    <div class="price">{{ price(member.membership[0]) }}</div>
    <div class="reference">{{ reference(member.membership[0]) }}</div>
    <div class="discount">{{ discounts(member.membership[0]) }}</div>
    <button @click="togglePaid(member)" v-if="member.paid">poista maksu</button>
    <button @click="togglePaid(member)" v-else>merkitse maksu</button>
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
    togglePaid: function(member) { 
      console.log(member)
      member.paid = member.paid ? false : true
    }
  },
  mounted: function() {
  }
}

</script>

<style lang="scss" scoped>

$button-width: 150px;

.item {
  display: grid;
  /* grid-template-columns: 180px auto 170px auto 85px 85px; */
  grid-template-columns: 180px 40px 40px auto $button-width;
  grid-template-rows: repeat(2, auto);
  background: lightgray;
  max-width: 850px;
  margin: .2em auto;
  padding: .3em;
  border-radius: 3px;
  background-color: lightgray;
  div {
    padding: .2em;
    text-align: left;
  }
  .showMore {
    grid-column-start: 1;
    grid-column-end: span 4;
    text-align: left;
  }
  .fullname {
    text-align: left;
  }
  .phone {
    text-align: left;
  }
  button {
    border: none;
    width: $button-width;
    border: solid 1px white;
    outline: none;
    margin-right: 100px;
  }
  .moreInfo {
    display: flex;
    h6 {
      margin: .4em;
    }
    ul {
      margin: 0 1em 0 .4em;
      padding: 0;
      font-size: .8em;
      list-style: none;
    }
  }
}

/* utilities */

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
