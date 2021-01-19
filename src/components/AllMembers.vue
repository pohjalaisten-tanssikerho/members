<template>
  <div class="margin-bottom">
    <nav class="nav-secondary">
      <a href="" @click.prevent="$emit('togglemodal', 'mails')">Sähköpostit</a>
    </nav>
    <div id="mails" class="hidden modal">
      <button @click="$emit('togglemodal', 'mails')">sulje</button>
      <button @click="$emit('copy-to-clipboard', 'copyToClipboard')">kopioi leikepöytään</button>
      <span id="copyMessage" class="hidden sm">ok</span>
      <div id="mail-list" class="mail-list">
        <p>Sähköpostia lähettäessäsi sähköpostien osoitteet tulee kirjoittaa BCC-kenttään ja TO-kenttään oma osoitteesi, eli osoite mistä sähköpostia lähetetään. Painamalla nappulaa "kopioi leikepöytään" voit helposti kopioida kaikki osoitteet.</p>
        <textarea id="copyToClipboard" :value="allmails" readonly></textarea>
      </div>
    </div>
    <div class="item" :id="member.email" v-for="member in members" :key="member.email">
      <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
      <div class="email">{{member.email}}</div>
      <div>{{ member.hometown }}</div>
      <div class="margin"></div>
      <button @click="showMore(member.email)">näytä lisää</button>
      <button class="warning" @click="$emit('remove-member', member, member.id)">poista</button>
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
              <!-- <li v&#45;if="member.membership[0].hyy.length > 0">{{ member.membership[0].hyy }}</li> -->
              <li v-if="member.membership[0].club">osakuntalainen</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AllMembers',
  data() {
    return {
      allmails: '',
    }
  },
  props: ['members'],
  emits: ['removeMember', 'togglemodal', 'copyToClipboard'],
  methods: {
    showMore: function(memberId) {
      const member = document.getElementById(memberId)
      member.classList.toggle('hidden')
    },
    populateMails: function() {
      this.allmails = ''
      const allMailsArray = []
      this.members.forEach(member => {
        allMailsArray.push(member.email)
      })
      this.allmails = allMailsArray.toString()
    }
  },
  mounted: function() {
    this.populateMails();
  }
}

</script>

<style lang='scss' scoped>

$white: #e9f3ff;
$orange: #fb9039;
$blue: #062f4f;
$lightblue: #0b3c5d;
$neonblue: #009fff;
$nightblue: #022140;
$tintblue: #05386b;
$opacity-half: rgba(0, 0, 0, 0.47);

.item {
  display: grid;
  grid-template-columns: 200px 270px 100px auto 95px 95px;
  grid-template-rows: repeat(2, auto);
  background: $opacity-half;
  max-width: 850px;
  margin: .2em auto;
  padding: .3em;
  div {
    padding: .2em;
    text-align: left;
    color: $white;
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
    color: $white;
    border: none;
    width: 90px;
    border: solid 1px $tintblue;
    outline: none;
    margin-right: 100px;
    background-color: $nightblue;
    &.warning {
      background: $blue;
    }
    &:hover {
      border-color: $neonblue;
    }
    &:active {
      border-color: $orange;
    }
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

</style>
