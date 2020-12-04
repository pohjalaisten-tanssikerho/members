<template>
  <nav>
    <a href="" @click.prevent="foo">Kaikki jäsenet</a>
    <a href="" @click.prevent>Maksujen tarkastus</a>
    <a href="" @click.prevent>Läsnäololistat</a>
  </nav>
  <AllMembers v-bind:members="members" />
</template>

<script>
import AllMembers from './components/AllMembers.vue'

export default {
  name: 'App',
  components: {
    AllMembers
  },
  data() {
    return {
      members: [
        { fname: 'Greatman', lname: 'Lim', email: 'fname.lname@mahti.com', phone: '044 5200985', paid: true, courses: [{ courseId: 'jatko', role: 'viejä' }], membership: [{ student: false, club: false, hyy: '' }] },
        { fname: 'Tom', lname: 'Hanks', email: 'tom.hanks@mahti.org', phone: '044 0000000', paid: false, courses: [{ courseId: 'alkeetOma', role: 'viejä' }], membership: [{ student: true, club: true, hyy: '001' }] },
        { fname: 'Leonardo', lname: 'DiCaprio', email: 'leo.dicaprio@mahti.org', phone: '044 0000001', paid: true, courses: [{ courseId: 'alkeet', role: 'viejä' }, { courseId: 'alkeisjatko', role: 'seuraaja' }], membership: [{ student: true, club: false, hyy: '002' }] },
        { fname: 'Will', lname: 'Smith', email: 'will.smith@mahti.org', phone: '044 0000002', paid: true, courses: [{courseId: 'alkeet', role: 'viejä'}], membership: [{ student: true, club: false, hyy: '003' }] },
        { fname: 'Denzel', lname: 'Washington', email: 'denzel.washington@mahti.org', phone: '044 0000003', paid: true, courses: [{courseId: 'jatko', role: 'viejä'}], membership: [{ student: true, club: true, hyy: '004' }] }
      ]
    }
  },
  methods: {
    showMore: function(memberId) {
      const member = document.getElementById(memberId)
      member.classList.toggle('hidden')
    },
    removeMember: function(memberObj) {
      this.members = this.members.filter((obj) => { return obj !== memberObj })
    },
    foo: function() {
      console.log('foo')
    }
  },
  mounted: function() {
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

.item {
  display: grid;
  grid-template-columns: 170px 140px 170px auto 85px 85px;
  grid-template-rows: repeat(2, auto);
  background: lightgray;
  max-width: 850px;
  margin: .2em auto;
  padding: .3em;
  border-radius: 3px;
  div {
    padding: .2em;
    text-align: left;
  }
  .showMore {
    grid-column-start: 1;
    grid-column-end: span 4;
    text-align: left;
  }
  .fullname {
    text-align: left;
  }
  .phone {
    text-align: left;
  }
  button {
    border: none;
    width: 80px;
    border: solid 1px white;
    outline: none;
    margin-right: 100px;
  }
  .moreInfo {
    display: flex;
    h6 {
      margin: .4em;
    }
    ul {
      margin: 0 1em 0 .4em;
      padding: 0;
      font-size: .8em;
      /* margin: 0; */
      /* padding: 0; */
      /* padding-left: 0; */
      list-style: none;
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
