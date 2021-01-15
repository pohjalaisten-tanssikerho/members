export class CourseStatistic {
  constructor(label) {
    this.label = label
    this.follower = 0
    this.leader = 0
    this.balance = 0
    this.hometown = {
      helsinki: 0,
      vantaa: 0,
      espoo: 0,
      other: 0
    }
    this.membership = {
      student: 0,
      club: 0,
      studentAndClub: 0,
      other: 0
    }
    this.income = {
      paid: 0,
      total: 0,
    }
    this.payment = {
      personPaid: 0,
      total: 0,
    }
  }
}

export default CourseStatistic
