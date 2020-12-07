<template>
  <div class="item" v-for="member in members" :key="member.email">
    <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
    <div class="phone">{{member.phone}}</div>
    <div class="email">{{member.email}}</div>
    <div class="margin"></div>
    <button @click="showMore(member.email)">näytä lisää</button>
    <!-- <button class="warning" @click="removeMember(member)">poista</button> -->
    <button class="warning" @click="$emit('removemember', member)">poista</button>
    <div :id="member.email" class="showMore hidden">
      <div class="moreInfo">
        <section>
          <h6>Jäsenyys</h6>
          <ul>
            <li v-for="course in member.courses" :key="course">
              <span v-if="course.courseId == 'kannatus'">kannatusjäsen</span>
              <span v-else>{{ course.courseId }}, {{ course.role }}</span>
            </li>
            <li v-if="member.support">kannatusjäsen</li>
          </ul>
        </section>
        <section>
          <h6>Alennusoikeus</h6>
          <ul>
            <li v-if="member.membership[0].student">opiskelija</li>
            <li v-if="member.membership[0].hyy.length > 0">{{ member.membership[0].hyy }}</li>
            <li v-if="member.membership[0].club">osakuntalainen</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AllMembers',
  data() {
    return {
    }
  },
  props: ['members'],
  methods: {
    showMore: function(memberId) {
      const member = document.getElementById(memberId)
      member.classList.toggle('hidden')
    },
    removeMember: function(memberObj) {
      // this.members = this.members.filter((obj) => { return obj !== memberObj })
      console.log(memberObj)
    }
  },
}

</script>

<style lang='scss' scoped>

.item {
  display: grid;
  grid-template-columns: 180px 140px 170px auto 85px 85px;
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
