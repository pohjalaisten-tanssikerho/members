<template>
  <div v-if="isShow">
    <div class="item" :class="{ paid : member.paid }" v-for="member in sortedMembers" :key="member.email">
      <div class="fullname">{{ member.lname }}, {{ member.fname }} </div> 
      <div class="phone">{{member.phone}}</div>
      <div class="email">{{member.email}}</div>
      <div class="margin"></div>
      <button @click="showMore(member.email)">näytä lisää</button>
      <button class="warning" @click="removeMember(member)">poista</button>
      <div :id="member.email" class="showMore hidden">
        <div class="moreInfo">
          <section>
            <h6>kurssit ja roolit</h6>
            <ul>
              <li v-for="course in member.courses" :key="course">{{ course.courseId }}, {{ course.role }}</li>
            </ul>
          </section>
          <section>
            <h6>jäsenyydet</h6>
            <ul>
              <li v-if="member.membership[0].student">opiskelija</li>
              <li v-if="member.membership[0].hyy.length > 0">{{ member.membership[0].hyy }}</li>
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
      isShow: true,
      sortedMembers: this.members
    }
  },
  props: ['members'],
  methods: {
    removeMember: function(memberObj) {
      this.sortedMembers = this.sortedMembers.filter((obj) => { return obj !== memberObj })
    }
  },
  mounted: function() {
    this.sortedMembers.sort((a, b) => (a.lname > b.lname) ? 1 : -1)
  }
}

</script>

<style>

</style>
