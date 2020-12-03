<template>
  <list />
  <div class="item" :class="{ paid : member.paid }" v-for="member in members" :key="member.email">
    <div class="fullname">{{ member.fname }} {{ member.sname }}</div> 
    <div class="phone">{{member.phone}}</div>
    <div class="email">{{member.email}}</div>
    <button @click="showMore(member.email)">O</button>
    <div :id="member.email" class="showMore hidden">
      <div class="moreInfo">
        <section>
          <h6>kurssit</h6>
          <ul>
            <li v-for="course in member.courses" :key="course">{{ course }}</li>
          </ul>
        </section>
        <section>
          <h6>markkinointi</h6>
          <ul>
            <li><span v-if="member.marketing[0].party">X</span> tanssibileet</li>
            <li><span v-if="member.marketing[0].course">X</span> tiiviskurssit</li>
          </ul>
        </section>
    </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List
  },
  data() {
    return {
      members: [
        { fname: 'Greatman', sname: 'Lim', email: 'fname.sname@mahti.com', phone: '044 5200985', paid: true, courses: ['jatko'], marketing: [{ party: true, course: true }]},
        { fname: 'Tom', sname: 'Hanks', email: 'tom.hanks@mahti.org', phone: '044 0000000', paid: false, courses: ['alkeetOma'], marketing: [{ party: false, course: true }]},
        { fname: 'Leonardo', sname: 'DiCaprio', email: 'leo.dicaprio@mahti.org', phone: '044 0000001', paid: true, courses: ['alkeisjatko', 'alkeet'], marketing: [{ party: true, course: true }] },
        { fname: 'Will', sname: 'Smith', email: 'will.smith@mahti.org', phone: '044 0000002', paid: true, courses: ['alkeet'], marketing: [{ party: true, course: true }]}
      ]
    }
  },
  methods: {
    showMore: function(memberId) {
      const member = document.getElementById(memberId)
      member.classList.toggle('hidden')
    }
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

.item {
  display: grid;
  grid-template-columns: 170px 140px 170px auto;
  grid-template-rows: repeat(2, auto);
  background: red;
  margin: .2em;
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
    margin-left: auto;
    margin-right: 1em;
    border: none;
    background: none;
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

.paid {
  background: gray,
}

/* utilities */
.hidden {
  display: none;
}

</style>
