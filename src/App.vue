<template>
  <div v-if="isLogged">
    <nav id="nav-main">
      <ul>
        <!-- <li>Analyysi</li> -->
        <li></li>
        <li class="list-header"> jäsenrekisteri: </li>
        <li v-if="currentCollection == 'demo'">demo</li>
        <span v-else><a href="#">2020k</a></span>
          <!-- <span><a href="#">2020s</a></span> -->
          <!-- <span><a href="#">2021s</a></span> -->
          <!-- <span><a href="#">2021k</a></span> -->
      </ul>
      <ul class="nav-align-right">
        <li class="unhilight"><a href="/" @click.prevent="logout">Kirjaudu ulos</a></li>
      </ul>
    </nav>
    <nav id="nav-views" class="primary hide-from-print">
      <ul>
        <li :class="{hilight : displays.AllMembers}"><a href="" class="hide-from-print"  @click.prevent="display('AllMembers')">Kaikki jäsenet</a></li>
        <li :class="{hilight : displays.PaymentCheck}"><a href="" class="hide-from-print" @click.prevent="display('PaymentCheck')">Maksujen tarkastus</a></li>
        <li :class="{hilight : displays.AttendanceList}"><a href="" class="hide-from-print" @click.prevent="display('AttendanceList')">Läsnäololistat</a></li>
        <li :class="{hilight : displays.Statistic}"><a href="" class="hide-from-print" @click.prevent="display('Statistic')">Statistiikka</a></li>
      </ul>
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
  </div>
  <div id="login-wrapper" v-else>
    <div id="login-form">
      <h1>POT Jäsenrekisteri</h1>
      <p>Tervetuloa Pohjalaisten tanssikerhon jäsenrekisterin hallintasivulle. Ole hyvä ja kirjaudu. Halutessasi voit tutustua järjestelmään <a href="/" @click.prevent="loginAsDemo">kirjautumalla demo-käyttäjänä</a>.</p>
      <form action="" @submit.prevent="login">
        <label for="password">Salasana:</label>
        <input type="password" name="password" v-model="password">
        <button>Kirjaudu</button>
      </form>
    </div>
  </div>
</template>


<script>
import { db, auth } from './utilities/firebase.js'
import AllMembers from './components/AllMembers.vue'
import PaymentCheck from './components/PaymentCheck.vue'
import AttendanceList from './components/AttendanceList.vue'
import Statistic from './components/Statistic.vue'
import demoMembers from './tests/demoMembers.js'

export default {
  name: 'App',
  components: { 
    AllMembers,
    PaymentCheck, 
    AttendanceList, 
    Statistic,
  },
  data() {
    return {
      members: new Array(),
      displays: { AllMembers: true, PaymentCheck: false, AttendanceList: false, Statistic: false },
      currentCollection: '',
      isLogged: undefined,
      authUser: {},
      password: '',
    }  
  },
  methods: {
    removeMember: function(memberView, fireId) {
      if (this.currentCollection === 'demo') {
        this.members = this.members.filter( obj => { return obj.email !== memberView.email })
      } 
      else {
        db.collection(this.currentCollection)
          .doc(fireId)
          .delete()
          .then(() => { 
            this.members = new Array()
            this.fetchFireBase(this.currentCollection)
          })
          .catch(() => { 'Failed to removing document: ', fireId })
      }
    },
    display: function(target) {
      Object.keys(this.displays).forEach(k => this.displays[k] = false);
      this.displays[target] = true
    },
    toggleModal: function(modal){
      document.getElementById(modal).classList.toggle('hidden')
    },
    togglePaid: function(courseId, memberId, courseElement) {
      if (this.currentCollection === 'demo') {
        courseElement.paid = !courseElement.paid
      }
      else {
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
      }
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
      this.members = new Array()
      db.collection(collection)
        .orderBy('lname')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.members.push({ ...doc.data(), id: doc.id })
            })
        })
    },
    loginAsDemo: function() {
      this.isLogged = true
      this.members = demoMembers
      this.currentCollection = 'demo'
    },
    login: function() {
      auth.signInWithEmailAndPassword('pohjalaistentanssikerho.ry@gmail.com', this.password)
        .then(() => {
          this.password = ''
          this.currentCollection = '2020k'
          this.fetchFireBase(this.currentCollection)
        })
        .catch(err => {
          console.warn('Error login: ' + err)
        })
    },
    logout: function() {
      auth
        .signOut()
        .then(() => {
          this.isLogged = false
          this.authUser = {}
          this.display('AllMembers')
        })
        .catch(e => console.warn('Error when signout: ' + e))
    },
  },
  mounted: function() {
    this.members.sort((a, b) => (a.lname > b.lname) ? 1 : -1)

    auth.onAuthStateChanged( user => {
      if(user) {
        this.isLogged = true
        this.authUser = user
        this.currentCollection = '2020k'
        this.fetchFireBase(this.currentCollection)
      } else {
        this.isLogged = false
        this.authUser = {}
      }
    })

  },
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
  margin-bottom: 1em;
}

#login-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  justify-items: center;
  align-items: center;
  #login-form {
    background: $opacity-half;
    width: 400px;
    height: 200px;
    border: 2px solid $tintblue;
    border-radius: .5em;
    padding: 1em;
    form {
      text-align: left;
      button {
        margin: 1em;
        margin-left: 0;
        text-align: right;
      }
      label {
        padding-right: 1em;
        color: $white;
      }
      input {
        width: 280px;
      }
    }
    p {
      text-align: left;
    }
    h1 {
      color: $white
    }
    a {
      color: $neonblue;
      &:hover {
        color: $orange;
      }
    }
  }
}

#nav-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
      border-bottom: solid 4px $orange;
      /* span { */
      /*   margin-left: .7rem; */
      /*   padding-bottom: .3rem; */
      /*   border-bottom: solid 4px $tintblue; */
      /*   border-bottom-color: $orange; */
      /*   &:first-of-type { */
      /*     border-bottom: solid 4px $blue; */
      /*   } */
      /*   &:hover:not(:first-of-type) { */
      /*     border-bottom-color: $orange; */
      /*   } */
      /* } */
      /* &:first-of-type { */
      /*   border-bottom: solid 4px $tintblue; */
      /*   &:hover { */
      /*     border-bottom-color: $orange; */
      /*   } */
      /* } */
      &.list-header {
        border-bottom: solid 4px $tintblue;
        border-bottom-color: $tintblue;
      }
      &.unhilight {
        border-bottom-color: $tintblue;
        &:hover {
          border-bottom-color: $orange;
        }
      }
    }
  }
  ul.nav-align-right {
    text-align: right;
  }
}

#nav-views {
  text-align: left;
  margin: 0;
  padding: 1em 0;
  padding-left: 40px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      margin-right: 1rem;
      color: $white;
      text-transform: uppercase;
      font-size: .9rem;
      padding-bottom: .3rem;
      border-bottom: 4px solid $tintblue;
      &:hover {
        border-bottom-color: $orange;
      }
      &.hilight {
        border-bottom-color: $orange;
      }
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
