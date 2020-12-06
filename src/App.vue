<template>
  <nav>
    <a href="" @click.prevent="display('AllMembers')">Kaikki jäsenet</a>
    <a href="" @click.prevent="display('PaymentCheck')">Maksujen tarkastus</a>
    <a href="" @click.prevent="display('AttendanceList')">Läsnäololistat</a>
  </nav>
  <AllMembers v-bind:members="members" @removemember="removeMember" v-if="displays.AllMembers" />
  <PaymentCheck v-bind:members="members" v-if="displays.PaymentCheck"/>
  <AttendanceList v-bind:members="members" v-if="displays.AttendanceList"/>
</template>

<script>
import AllMembers from './components/AllMembers.vue'
import PaymentCheck from './components/PaymentCheck.vue'
import AttendanceList from './components/AttendanceList.vue'

export default {
  name: 'App',
  components: {
    AllMembers, PaymentCheck, AttendanceList
  },
  data() {
    return {
      members: [
        { fname: 'Greatman', lname: 'Lim', email: 'fname.lname@mahti.com', phone: '044 5200985', paid: true, courses: [{ courseId: 'jatko', role: 'viejä' }, { support: false }], membership: [{ student: false, club: false, hyy: '' }] },
        { fname: 'Tom', lname: 'Hanks', email: 'tom.hanks@mahti.org', phone: '044 0000000', paid: false, courses: [{ courseId: 'alkeetOma', role: 'viejä' }, { support: true }], membership: [{ student: true, club: true, hyy: '001' }] },
        { fname: 'Leonardo', lname: 'DiCaprio', email: 'leo.dicaprio@mahti.org', phone: '044 0000001', paid: true, courses: [{ courseId: 'alkeet', role: 'viejä' }, { courseId: 'alkeisjatko', role: 'seuraaja' }, { support: true }], membership: [{ student: true, club: false, hyy: '002' }] },
        { fname: 'Will', lname: 'Smith', email: 'will.smith@mahti.org', phone: '044 0000002', paid: true, courses: [{courseId: 'alkeet', role: 'viejä' }, { support: false }], membership: [{ student: true, club: false, hyy: '003' }] },
        { fname: 'Denzel', lname: 'Washington', email: 'denzel.washington@mahti.org', phone: '044 0000003', paid: true, courses: [{courseId: 'jatko', role: 'viejä'}, { support: false }], membership: [{ student: true, club: true, hyy: '004' }] }
      ],
      displays: { AllMembers: true, PaymentCheck: false, AttendanceList: false }
    }
  },
  methods: {
    removeMember: function(memberObj) {
      this.members = this.members.filter((obj) => { return obj !== memberObj })
    },
    display: function(target) {
        Object.keys(this.displays).forEach(k => this.displays[k] = false);
        this.displays[target] = true
    }
  },
  mounted: function() {
    this.members.sort((a, b) => (a.lname > b.lname) ? 1 : -1)
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
