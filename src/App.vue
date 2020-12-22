<template>
  <nav id="nav-main">
    <ul>
      <li>analyysi</li>
      <li>
        <span>jäsenrekisteri:</span>
        <span><a href="#">2020k</a></span>
        <span><a href="#">2020s</a></span>
        <span><a href="#">2021s</a></span>
        <span><a href="#">2021k</a></span>
      </li>
    </ul>
  </nav>
  <nav id="nav-views" class="primary hide-from-print">
    <a href="" class="hide-from-print" @click.prevent="display('AllMembers')">Kaikki jäsenet</a>
    <a href="" class="hide-from-print" @click.prevent="display('PaymentCheck')">Maksujen tarkastus</a>
    <a href="" class="hide-from-print" @click.prevent="display('AttendanceList')">Läsnäololistat</a>
    <a href="" class="hide-from-print" @click.prevent="display('Statistic')">Statistiikka</a>
  </nav>
  <AllMembers 
    :members="members" 
    @remove-member="removeMember" 
    @togglemodal="toggleModal"
    @copy-to-clipboard="copyToClipboard"
    v-if="displays.AllMembers" />
  <PaymentCheck
    :members="members" 
    @togglemodal="toggleModal" 
    @copy-to-clipboard="copyToClipboard" 
    @toggle-paid="togglePaid"
    v-if="displays.PaymentCheck"/>
  <AttendanceList 
    :members="members"
    @togglemodal="toggleModal" 
    @copy-to-clipboard="copyToClipboard" 
    v-if="displays.AttendanceList"/>
  <Statistic 
    v-if="displays.Statistic"
    :members="members"
    :proptest="proptest"
  />
</template>


<script>
import { db } from './utilities/firebase.js'
import AllMembers from './components/AllMembers.vue'
import PaymentCheck from './components/PaymentCheck.vue'
import AttendanceList from './components/AttendanceList.vue'
import Statistic from './components/Statistic.vue'

// { fname: 'Greatman', lname: 'Lim', email: 'fname.lname@mahti.com', phone: '044 5200985', courses: [{ courseId: 'jatko', role: 'viejä', paid: true }], membership: [{ student: false, club: false, hyy: '' }] },
// { fname: 'Tom', lname: 'Hanks', email: 'tom.hanks@mahti.org', phone: '044 0000000', courses: [{ courseId: 'alkeetOma', role: 'viejä', paid: false }, { courseId: 'kannatus', amount: '20', paid: true }], membership: [{ student: true, club: true, hyy: '001' }] },
// { fname: 'Leonardo', lname: 'DiCaprio', email: 'leo.dicaprio@mahti.org', phone: '044 0000001', courses: [{ courseId: 'alkeet', role: 'viejä', paid: true }, { courseId: 'alkeisjatko', role: 'seuraaja', paid: false }, { courseId: 'kannatus', amount: '10', paid: false }], membership: [{ student: true, club: false, hyy: '002' }] },
// { fname: 'Will', lname: 'Smith', email: 'will.smith@mahti.org', phone: '044 0000002', courses: [{courseId: 'alkeet', role: 'viejä', paid: true }], membership: [{ student: true, club: false, hyy: '003' }] },
// { fname: 'Denzel', lname: 'Washington', email: 'denzel.washington@mahti.org', phone: '044 0000003', courses: [{courseId: 'jatko', role: 'viejä', paid: true}], membership: [{ student: true, club: true, hyy: '004' }] }

export default {
  name: 'App',
  components: { AllMembers, PaymentCheck, AttendanceList, Statistic },
  data() {
    return {
      members: new Array(),
      displays: { AllMembers: false, PaymentCheck: false, AttendanceList: false, Statistic: true },
      currentCollection: '2020k',
    }  
  },
  methods: {
    removeMember: function(memberView, fireId) {
      db.collection(this.currentCollection)
        .doc(fireId)
        .delete()
        .then(() => { 
          this.members = new Array()
          this.fetchFireBase(this.currentCollection)
        })
        .catch(() => { 'Failed to removing document: ', fireId })
    },
    display: function(target) {
      Object.keys(this.displays).forEach(k => this.displays[k] = false);
      this.displays[target] = true
    },
    toggleModal: function(modal){
      document.getElementById(modal).classList.toggle('hidden')
    },
    togglePaid: function(courseId, memberId, courseElement) {
      const courses = new Array()
      db.collection(this.currentCollection)
        .doc(memberId)
        .get()
        .then(doc => {
            courses.push( ...doc.data().courses )
            courses.forEach(course => {
                if (course.courseId === courseId) { course.paid = !(course.paid)}
            }) 
            db.collection(this.currentCollection)
              .doc(memberId)
              .update({
                  courses: courses
              })
              .then(() => courseElement.paid = courseElement.paid ? false : true)
        })
    },
    copyToClipboard: function(copyTarget) {
      const textToCopy = document.getElementById(copyTarget)
      textToCopy.select()
      document.execCommand('copy')
      if (window.getSelection) {window.getSelection().removeAllRanges()}
      else if (document.selection) {document.selection.empty()}
      document.getElementById('copyMessage').classList.remove('hidden')
    },
    fetchFireBase: function(collection) {
      console.log(collection)
      db.collection(collection)
        .orderBy('lname')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.members.push({ ...doc.data(), id: doc.id })
            })
        })
    }
  },
  mounted: function() {
    this.members.sort((a, b) => (a.lname > b.lname) ? 1 : -1)
  },
  created() {
    this.fetchFireBase(this.currentCollection)
  }
}
</script>

<style lang="scss">

$white: #e9f3ff;
$orange: #fb9039;
$blue: #062f4f;
$lightblue: #0b3c5d;
$neonblue: #009fff;
$nightblue: #022140;
$tintblue: #05386b;
$opacity-half: rgba(0, 0, 0, 0.47);

body {
  margin: 0;
  background-image: url("https://raw.githubusercontent.com/pohjalaisten-tanssikerho/web-page/master/static/img/bg.jpg");
  background-position: center top;
}

a, a:link, a:visited {
  color: $white;
  text-decoration: none;
}

p {
  color: $white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

#nav-main {
  border: 3px solid $tintblue;
  border-left: none;
  border-right: none;
  background-color: $nightblue;
  margin: 0;
  padding: 0;
  text-align: left;
  ul {
    list-style: none;
    li {
      display: inline-block;
      margin-right: 1rem;
      color: $white;
      text-transform: uppercase;
      font-size: .9rem;
      padding-bottom: .3rem;
      span {
        margin-left: .7rem;
        padding-bottom: .3rem;
        border-bottom: solid 4px $tintblue;
        &:first-of-type {
          border-bottom: solid 4px $blue;
        }
        &:hover:not(:first-of-type) {
          border-bottom-color: $orange;
        }
      }
      &:first-of-type {
        border-bottom: solid 4px $tintblue;
        &:hover {
          border-bottom-color: $orange;
        }
      }
    }
  }
}

#nav-views {
  display: flex;
  justify-content: center;
  margin: 1em;
  a {
    background: $tintblue;
    border: solid 2px $nightblue;
    padding: 1rem;
    margin: .7rem;
    &:visited, &:active, &:link {
      color: $white;
      text-decoration: none;
    }
    &:hover {
      border-color: $neonblue;
    }
    &:active {
      border-color: $orange;
    }
  }
  &.secondary {
    a {
      background: lightgray;
      padding: .5em;
    }
  }
}

.nav-secondary {
  margin: 1rem;
  margin-bottom: 2rem;
  a {
    background-color: $nightblue;
    border: solid 2px $tintblue;
    padding: .4rem;
    margin-right: 1rem;
    &:hover {
      border-color: $neonblue;
    }
    &:active {
      border-color: $orange;
    }
  }
}

.modal {
  position: absolute;
  width: 700px;
  background: $nightblue;
  border: solid 2px $tintblue;
  left: 50%;
  transform: translate(-50%, 0);
  padding: .5em;
  text-align: left;
  .mail-list {
    padding: 1.5em;
  }
  button {
    border: none;
    border: solid 1px $tintblue;
    outline: none;
    margin-right: .4em;
    background: $lightblue;
    color: $white;
    &:hover {
      background-color: $blue;
    }
    &:active {
      border-color: $orange;
    }
  }
  .sm {
    font-size: .8em;
  }
  textarea {
    width: 100%;
    border: none;
    resize: none;
    background: $nightblue;
    color: $white;
    outline: none;
    padding: 0;
    font-size: .9em;
  }
  p {
    margin-top: 0;
  }
  h2 {
    color: $white;
  }
}

.margin-bottom {
  margin-bottom: 3rem;
}

/* utilities */
.paid {
  background: lightgray,
}

.unpaid {
  background: $tintblue;
}

.hidden {
  display: none;
}

</style>
