<template>
  <div v-if="isLogged">
    <nav id="nav-main">
      <ul v-if="currentCollection === 'demo'">
        <!-- <li>Analyysi</li> -->
        <li></li>
        <li class="list-header"> jäsenrekisteri: </li>
        <li>demo</li>
      </ul>
      <ul v-else>
        <!-- <li>Analyysi</li> -->
        <li class="list-header"> jäsenrekisteri: </li>
        <li :class="{ hilight : season.selected }" v-for="season in seasons" :key="season.season">
          <a href="#" @click.prevent="changeCollection(season)">{{ season.season }}</a>
        </li>
      </ul>
      <ul class="nav-align-right">
        <li class=""><a href="/" @click.prevent="logout">Kirjaudu ulos</a></li>
      </ul>
    </nav>
    <main>
      <nav id="nav-views" class="primary hide-from-print">
        <ul>
          <li><a href="" class="hide-from-print" :class="{ hilight : displays.AllMembers }"  @click.prevent="display('AllMembers')">Kaikki jäsenet</a></li>
          <li><a href="" class="hide-from-print" :class="{ hilight : displays.PaymentCheck }" @click.prevent="display('PaymentCheck')">Maksujen tarkastus</a></li>
          <li><a href="" class="hide-from-print" :class="{ hilight : displays.AttendanceList }" @click.prevent="display('AttendanceList')">Läsnäololistat</a></li>
          <li><a href="" class="hide-from-print" :class="{ hilight : displays.Statistic }" @click.prevent="display('Statistic')">Statistiikka</a></li>
        </ul>
      </nav>
      <AllMembers 
        class="display"
        :members="members" 
        @remove-member="removeMember" 
        @togglemodal="toggleModal"
        @copy-to-clipboard="copyToClipboard"
        v-if="displays.AllMembers" />
      <PaymentCheck
        class="display"
        :members="members" 
        @togglemodal="toggleModal" 
        @copy-to-clipboard="copyToClipboard" 
        @toggle-paid="togglePaid"
        v-if="displays.PaymentCheck"/>
      <AttendanceList 
        class="display"
        :members="members"
        @togglemodal="toggleModal" 
        @copy-to-clipboard="copyToClipboard" 
        v-if="displays.AttendanceList"/>
      <Statistic 
        class="display"
        v-if="displays.Statistic"
        :members="members"
        :proptest="proptest"
      />
    </main>
  </div>
  <div id="login-wrapper" v-else>
    <div id="login-form">
      <h1>POT Jäsenrekisteri</h1>
      <p>Tervetuloa Pohjalaisten tanssikerhon jäsenrekisterin hallintasivulle. Ole hyvä ja kirjaudu. Halutessasi voit tutustua järjestelmään <a href="/" @click.prevent="loginAsDemo">kirjautumalla demo-käyttäjänä</a>.</p>
      <form @submit.prevent="login">
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
      seasons: [ 
        { season: '2021k', selected: true, },
        { season: '2020s', selected: false, },
        { season: '2020k', selected: false, }
      ],
      unsubscribe: function() { return undefined },
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
    fetchFireBase: function(collection, members) {
      this.unsubscribe = db.collection(collection)
        .orderBy('lname')
        .onSnapshot((querySnapshot) => {
          members.length = 0
          querySnapshot.forEach( doc => {
            members.push({ ...doc.data(), id: doc.id })
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
        })
        .catch(err => {
          console.warn('Error login: ' + err)
        })
    },
    logout: function() {
      this.unsubscribe()
      auth
        .signOut()
        .then(() => {
          this.isLogged = false
          this.authUser = {}
          this.display('AllMembers')
          this.members = new Array()
          this.currentCollection = ''
        })
        .catch(e => console.warn('Error when signout: ' + e))
    },
    changeCollection: function(season) {
      this.unsubscribe()
      this.currentCollection = season.season
      this.seasons.forEach(season => season.selected = false)
      season.selected = true
      this.fetchFireBase(this.currentCollection, this.members)
    },
  },
  computed: {
    currentSeason: function() {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const season = currentMonth < 6 ? 'k' : 's'
      return currentYear + season
    },
  },
  mounted: function() {
    this.members.sort((a, b) => (a.lname > b.lname) ? 1 : -1)

    auth.onAuthStateChanged( user => {
      if(user) {
        this.isLogged = true
        this.authUser = user
        this.currentCollection = this.currentSeason 
        this.fetchFireBase(this.currentCollection, this.members)
      } else {
        this.isLogged = false
        this.authUser = {}
      }
    })

  },
}

</script>

<style lang="scss">

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

content {
  margin: 3rem auto;
  text-align: center;
  height: 100%;
}

html {
  height: 100%;
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
    border: 2px solid $tintblue;
    border-radius: .5em;
    padding: 1em;
    form {
      margin: 1rem;
      text-align: left;
      button {
        background: $lightblue;
        margin: 1rem;
        padding: .7rem 2rem;
        margin-left: 0;
        text-align: right;
        border: solid 2px $tintblue;
        color: $white;
        font-weight: bold;
        outline: none;
        &:hover {
          border-color: $neonblue;
        }
        &:active {
          border-color: $orange;
        }
      }
      label {
        padding-right: 1em;
        color: $white;
      }
      input {
        margin-top: .3rem;
        width: 260px;
        height: 1.3rem;
        border-radius: 0;
        border: solid 2px $nightblue;
        &:focus, &:hover {
          outline: 1px solid $neonblue;
          outline-offset: -2px;
        }
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
      border-bottom: solid 4px $tintblue;
      &:hover {
        border-bottom-color: $orange;
      }
      &.list-header {
        border-bottom: solid 4px $tintblue;
        border-bottom-color: $tintblue;
      }
      &.hilight {
        border-bottom-color: $orange;
      }
    }
  }
  ul.nav-align-right {
    text-align: right;
  }
}

main {
  display: grid;
  grid-template-columns: 220px auto;
}

.display {
  margin-top: 1rem;
}


#nav-views {
  background: $tintblue;
  min-height: calc(100vh - 96px);
  height: 100%;
  text-align: left;
  padding-top: 1em;
  padding-left: 40px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin-right: 1rem;
      color: $white;
      text-transform: uppercase;
      font-size: .8rem;
      margin-bottom: .6rem;
      a {
        border-bottom: 2px solid $tintblue;
        &:hover {
          border-bottom-color: $neonblue;
        }
        &.hilight {
          border-bottom-color: $orange;
        }
      }
    }
  }
}

nav.selection {
  background: red;
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
