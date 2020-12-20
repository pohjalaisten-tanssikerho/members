<template>
  <div class="flex">
    <div class="first-cell"></div>
    <div class="day" v-for="day in days" :key="day">{{ day }}</div>
  </div>
  <div class="item" v-for="(member, index) in courseMembers" :key="index">
    <div class="flex">
      <div class="fullname first-cell">{{ member }}</div> 
      <div class="day-margin" :class="{ onlyitem : hasOneMember(courseMembers) }" v-for="day in days" :key="day"><div class="checkbox"></div></div>
    </div>
  </div>
  <div class="print-brake"></div>
</template>

<script>

export default {
  name: 'CourseList',
  props: ['courseMembers'],
  data() {
    return {
      days: ['15.9.', '22.9.', '29.9', '6.10.', '13.10.', '20.10.', '27.10.', '10.11.', '17.11.', '24.11.', '1.12.', '8.12.', '15.12.'],
    }
  },
  methods: {
    hasOneMember: function(members) {
      if (members.length === 1) return true
      else return false
    }
  }
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

.item {
  text-align: left;
}

.flex {
  display: flex;
  .first-cell {
    width: 180px;
  }
  .day {
    width: 50px;
    margin: 0 .3em;
    padding-top: .3em;
    text-align: center;
    background: $opacity-half;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: $white;
  }
  .day-margin {
    width: 50px;
    margin: 0 .3em;
    text-align: center;
    background-color: $opacity-half;
  }
  .checkbox {
    width: .8em;
    height: .8em;
    border: solid 1px $tintblue;
    background-color: $white;
    margin: auto;
    margin-top: 4px;
  }
}

.item + .item {
  .day-margin {
    /* background-color: blue; */
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-bottom: .3em;
  }
}

.onlyitem {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-bottom: .3em;
}


</style>
