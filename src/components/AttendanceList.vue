<template>

<div class="max-size">

    <h2>Alkeet</h2>
    <CourseList v-bind:courseMembers="alkeet" />

    <h2>Alkeet oman parin kanssa</h2>
    <CourseList v-bind:courseMembers="alkeetOma" />

    <h2>Alkeisjatko</h2>
    <CourseList v-bind:courseMembers="alkeisjatko" />

    <h2>Jatko</h2>
    <CourseList v-bind:courseMembers="jatko" />

</div>

</template>

<script>

import CourseList from './CourseList.vue'

export default {

  name: 'AttendanceList',
  props: ['members'],
  components: { CourseList },
  data() {
    return {
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
    margin-bottom: .8em;
    background-color: lightgray;
    border-radius: 5px;
    padding: .4em;
  }
  h2 ~ h2 {
    margin-top: 2em;
  }
}


</style>

