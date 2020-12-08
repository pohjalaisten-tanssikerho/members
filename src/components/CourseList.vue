<template>
      <div class="flex">
        <div class="firstCell"></div>
        <div class="day" v-for="day in days" :key="day">{{ day }}</div>
      </div>
    <div class="item" v-for="(member, index) in courseMembers" :key="index">
      <div class="flex">
        <div class="fullname firstCell">{{ member }}</div> 
        <div class="day-margin" :class="{ onlyitem : hasOneMember(courseMembers) }" v-for="day in days" :key="day"><div class="checkbox"></div></div>
      </div>
    </div>

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

.item {
  text-align: left;
}

.flex {
  display: flex;
  .firstCell {
    width: 180px;
  }
  .day {
    width: 50px;
    margin: 0 .3em;
    padding-top: .3em;
    text-align: center;
    background: lightgray;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .day-margin {
    width: 50px;
    margin: 0 .3em;
    text-align: center;
    background-color: lightgray;
  }
  .checkbox {
    width: .8em;
    height: .8em;
    border: solid 1px black;
    background-color: white;
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
