<template>

<div class="max-size">

    <h2>Alkeet</h2>
    <div class="item" v-for="(member, index) in alkeet" :key="index">
      <div class="fullname">{{ member }}</div> 
    </div>

    <h2>Alkeet oman parin kanssa</h2>
    <div class="item" v-for="(member, index) in alkeetOma" :key="index">
      <div class="fullname">{{ member }}</div> 
    </div>

    <h2>Alkeisjatko</h2>
    <div class="item" v-for="(member, index) in alkeisjatko" :key="index">
      <div class="flex">
        <div class="firstCell"></div>
        <div class="day" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="flex">
        <div class="fullname firstCell">{{ member }}</div> 
        <div class="day" v-for="day in days" :key="day"><div class="checkbox"></div></div>
      </div>
    </div>

    <h2>Jatko</h2>
    <div class="item" v-for="(member, index) in jatko" :key="index">
      <div class="fullname">{{ member }}</div> 
    </div>

</div>

</template>

<script>

export default {

  name: 'AttendanceList',
  props: ['members'],
  data() {
    return {
      days: ['15.9.', '22.9.', '29.9', '6.10.', '13.10.', '20.10.', '27.10.', '10.11.', '17.11.', '24.11.', '1.12.', '8.12.', '15.12.'],
      alkeet: [],
      alkeetOma: [],
      alkeisjatko: [],
      jatko: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.members.forEach(member => {
          member.courses.forEach(course => {
              if (course.courseId === 'alkeet') {
                this.alkeet.push(`${member.lname}, ${member.fname}`)
              }
              if (course.courseId === 'alkeetOma') {
                this.alkeetOma.push(`${member.lname}, ${member.fname}`)
              }
              if (course.courseId === 'alkeisjatko') {
                this.alkeisjatko.push(`${member.lname}, ${member.fname}`)
              }
              if (course.courseId === 'jatko') {
                this.jatko.push(`${member.lname}, ${member.fname}`)
              }
          })
      })
    })
  }
  }

</script>

<style lang="scss" scoped>

.max-size {
  max-width: 900px;
  margin: 0 auto;
  h2 {
    margin-bottom: .3em;
  }
  .item {
    text-align: left;
    .flex {
      display: flex;
      .firstCell {
        width: 180px;
      }
      .day {
        width: 50px;
        margin: 0 .3em;
        text-align: center;
        /* display: table; */
        .checkbox {
          width: .8em;
          height: .8em;
          border: solid 1px lightgray;
          margin: auto;
          margin-top: 4px;
        }
      }
    }
  }
}

</style>

