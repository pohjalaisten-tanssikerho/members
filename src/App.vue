<template>
  <nav class="primary">
    <a href="" @click.prevent="display('AllMembers')">Kaikki jäsenet</a>
    <a href="" @click.prevent="display('PaymentCheck')">Maksujen tarkastus</a>
    <a href="" @click.prevent="display('AttendanceList')">Läsnäololistat</a>
  </nav>
  <AllMembers 
    v-bind:members="members" 
    @remove-member="removeMember" 
    @togglemodal="toggleModal"
    @copy-to-clipboard="copyToClipboard"
    v-if="displays.AllMembers" />
  <PaymentCheck
    v-bind:members="members" 
    @togglemodal="toggleModal" 
    @copy-to-clipboard="copyToClipboard" 
    v-if="displays.PaymentCheck"/>
  <AttendanceList 
    v-bind:members="members"
    @togglemodal="toggleModal" 
    @copy-to-clipboard="copyToClipboard" 
    v-if="displays.AttendanceList"/>
</template>

<script>
import AllMembers from './components/AllMembers.vue'
import PaymentCheck from './components/PaymentCheck.vue'
import AttendanceList from './components/AttendanceList.vue'

export default {
  name: 'App',
  components: { AllMembers, PaymentCheck, AttendanceList },
  data() {
    return {
      members: [
        { fname: 'Greatman', lname: 'Lim', email: 'fname.lname@mahti.com', phone: '044 5200985', courses: [{ courseId: 'jatko', role: 'viejä', paid: true }], membership: [{ student: false, club: false, hyy: '' }] },
        { fname: 'Tom', lname: 'Hanks', email: 'tom.hanks@mahti.org', phone: '044 0000000', courses: [{ courseId: 'alkeetOma', role: 'viejä', paid: false }, { courseId: 'kannatus', amount: '20', paid: true }], membership: [{ student: true, club: true, hyy: '001' }] },
        { fname: 'Leonardo', lname: 'DiCaprio', email: 'leo.dicaprio@mahti.org', phone: '044 0000001', courses: [{ courseId: 'alkeet', role: 'viejä', paid: true }, { courseId: 'alkeisjatko', role: 'seuraaja', paid: false }, { courseId: 'kannatus', amount: '10', paid: false }], membership: [{ student: true, club: false, hyy: '002' }] },
        { fname: 'Will', lname: 'Smith', email: 'will.smith@mahti.org', phone: '044 0000002', courses: [{courseId: 'alkeet', role: 'viejä', paid: true }], membership: [{ student: true, club: false, hyy: '003' }] },
        { fname: 'Denzel', lname: 'Washington', email: 'denzel.washington@mahti.org', phone: '044 0000003', courses: [{courseId: 'jatko', role: 'viejä', paid: true}], membership: [{ student: true, club: true, hyy: '004' }] }
      ],
      displays: { AllMembers: true, PaymentCheck: false, AttendanceList: false }
    }
  },
  methods: {
    removeMember: function(memberObj) {
      this.members = this.members.filter(obj => { return obj !== memberObj })
    },
    display: function(target) {
      Object.keys(this.displays).forEach(k => this.displays[k] = false);
      this.displays[target] = true
    },
    toggleModal: function(modal){
      document.getElementById(modal).classList.toggle('hidden')
    },
    copyToClipboard: function(copyTarget) {
      const textToCopy = document.getElementById(copyTarget)
      textToCopy.select()
      document.execCommand('copy')
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}
      document.getElementById('copyMessage').classList.remove('hidden')
    },
  },
  mounted: function() {
    this.members.sort((a, b) => (a.lname > b.lname) ? 1 : -1)

    // this.payments
    //   .then(response =>  response.json())
    //   .then(data => console.log(data))

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  a {
    background: lightblue;
    border: solid 2px white;
    border-radius: 5px;
    padding: 1em;
    &:visited {
      color: black;
      text-decoration: none;
    }
    &:active {
      color: white;
    }
    &:link {
      text-decoration: none;
      color: white;
    }
  }
  &.secondary {
    a {
      background: lightgray;
      padding: .5em;
    }
  }
}

.modal {
  position: absolute;
  width: 700px;
  background: lightgray;
  border-radius: 5px;
  border: solid 2px gray;
  left: 50%;
  transform: translate(-50%, 0);
  padding: .5em;
  text-align: left;
  .mail-list {
    padding: 1.5em;
  }
  button {
    border: none;
    border: solid 1px white;
    outline: none;
    margin-right: .4em;
    background: white;
  }
  .sm {
    font-size: .8em;
  }
  textarea {
    width: 100%;
    border: none;
    resize: none;
    background: lightgray;
    color: #2c3e50;
    outline: none;
    padding: 0;
    font-size: .9em;
  }
  p {
    margin-top: 0;
  }
}

/* utilities */
.paid {
  background: lightgray,
}

.unpaid {
  background: red,
}

.hidden {
  display: none;
}

.warning {
  background: pink;
}

</style>
