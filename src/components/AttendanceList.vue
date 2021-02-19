<template>
  <div class="content">

    <p class="hide-from-print add-margin">Printtaaminen piilottaa kaikki tarpeettoman sivulta. Printtaus-asetuksista kannattaa valita printtaus taustakuvien kanssa.</p>

    <nav class="nav-secondary">
      <a href="" @click.prevent="$emit('togglemodal', 'membersByCourses')">sähköpostit kursseittain</a>
      <a href="" @click.prevent="print">printtaa</a>
    </nav>

    <div id="membersByCourses" class="hidden modal">
      <button @click="$emit('togglemodal', 'membersByCourses')">sulje</button>
      <span id="copyMessage" class="hidden sm">ok</span>
      <div class="mail-list">
        <p>Sähköpostia lähettäessäsi sähköpostien osoitteet tulee kirjoittaa BCC-kenttään ja TO-kenttään oma osoitteesi, eli osoite mistä sähköpostia lähetetään. Painamalla nappulaa "kopioi leikepöytään" voit helposti kopioida kaikki osoitteet.</p>
        <h2>Alkeet</h2> <button class="margin-bottom" @click="$emit('copy-to-clipboard', 'alkeet')">kopioi leikepöytään</button>
        <textarea id="alkeet" :value="sAlkeet" readonly></textarea>
        <h2>Alkeet oman parin kanssa</h2> <button class="margin-bottom" @click="$emit('copy-to-clipboard', 'alkeet-oma')">kopioi leikepöytään</button>
        <textarea id="alkeet-oma" :value="sAlkeetOma" readonly></textarea>
        <h2>Alkeisjatko</h2> <button class="margin-bottom" @click="$emit('copy-to-clipboard', 'alkeisjatko')">kopioi leikepöytään</button>
        <textarea id="alkeisjatko" :value="sAlkeisjatko" readonly></textarea>
        <h2>Jatko</h2> <button class="margin-bottom" @click="$emit('copy-to-clipboard', 'jatko')">kopioi leikepöytään</button>
        <textarea id="jatko" :value="sJatko" readonly></textarea>
      </div>
    </div>

    <div class="max-size">

      <h2>Alkeet</h2>
      <CourseList class="print-brake" v-bind:courseMembers="alkeet" />

      <h2>Alkeet oman parin kanssa</h2>
      <CourseList class="print-brake" v-bind:courseMembers="alkeetOma" />

      <h2>Alkeisjatko</h2>
      <CourseList class="print-brake" v-bind:courseMembers="alkeisjatko" />

      <h2>Jatko</h2>
      <CourseList class="print-brake" v-bind:courseMembers="jatko" />

    </div>

  </div>

</template>

<script>

import CourseList from './CourseList.vue'

export default {

  name: 'AttendanceList',
  props: ['members'],
  emits: ['togglemodal', 'copyToClipboard'],
  components: { CourseList },
  data() {
    return {
      alkeet: [],
      alkeetOma: [],
      alkeisjatko: [],
      jatko: [],
      sAlkeet: '',
      sAlkeetOma: '',
      sAlkeisjatko: '',
      sJatko: ''
    }
  },
  mounted: function() {
    this.$nextTick(function() {

      const aAlkeet = []
      const aAlkeetOma = []
      const aAlkeisjatko = []
      const aJatko = []

      this.members.forEach(member => {
          member.courses.forEach(course => {
              if (course.courseId === 'alkeet') {
                this.alkeet.push(`${member.lname}, ${member.fname}`)
                aAlkeet.push(member.email)
              }
              if (course.courseId === 'alkeetOma') {
                this.alkeetOma.push(`${member.lname}, ${member.fname}`)
                aAlkeetOma.push(member.email)
              }
              if (course.courseId === 'alkeisjatko') {
                this.alkeisjatko.push(`${member.lname}, ${member.fname}`)
                aAlkeisjatko.push(member.email)
              }
              if (course.courseId === 'jatko') {
                this.jatko.push(`${member.lname}, ${member.fname}`)
                aJatko.push(member.email)
              }
          })
      })

      this.sAlkeet = aAlkeet.toString()
      this.sAlkeetOma = aAlkeetOma.toString()
      this.sAlkeisjatko = aAlkeisjatko.toString()
      this.sJatko = aJatko.toString()

    })
  },
  methods: {
    print: function() {
      window.print()
    }
  }
}

</script>

<style lang="scss" scoped>

.max-size {
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 1rem;
  color: $white;
  h2 {
    margin-bottom: .8em;
    background-color: $opacity-half;
    padding: .4em;
    color: $white;
  }
  h2 ~ h2 {
    margin-top: 2em;
  }
}

.modal {
  h2 {
    display: inline;
    padding-right: .8em;
  }
}

/* utilities */

.add-margin {
  margin-bottom: 2rem;
}

</style>

<style lang="scss" media="print">
@page { size: landscape; }
@media print {
  nav, .hide-from-print {
    display: none;
  }
  .max-size {
    margin: 0 auto;
    margin-bottom: 1rem;
    color: black;
    h2 {
      margin-bottom: .8em;
      background-color: lightgray;
      padding: .4em;
    }
     h2 ~ h2 {
       margin-top: 2em;
     } 
  }

  * {
    color: black !important;
  }

  .print-brake {
    page-break-after: always !important;
  }

  body {
    background-image: none !important;
  }

}
</style>
