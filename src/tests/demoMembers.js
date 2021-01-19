const listOfCelebrities = [ 'Regé-Jean Page', 'Phoebe Dynevor', 'Anya Taylor-Joy', 'Vanessa Kirby', 'Elizabeth Olsen', 'Armie Hammer', 'Peyton List', 'Claudia Jessie', 'Nicola Coughlan', 'Jonathan Bailey', 'Elizabeth Debicki', 'Pedro Pascal', 'Elisabeth Shue', 'William Zabka', 'Emma Caulfield Ford', 'Jessica Campbell', 'Matthew Goode', 'Omar Sy', 'Teresa Palmer', 'Gina Carano', 'Zendaya', 'Leonardo DiCaprio', 'Sarah Shahi', 'Mary Mouser', 'Paul Bettany', 'Katheryn Winnick', 'Luke Evans', 'Ralph Macchio', 'Tanner Buchanan', 'Kathryn Hahn', 'Gal Gadot', 'Travis Fimmel', 'Courtney Henggeler', 'Thomas Brodie-Sangster', 'Tamlyn Tomita', 'Polly Walker', 'Martin Kove', 'Jill Wagner', 'Xolo Maridueña', 'John David Washington', 'Ana de Armas', 'Olivia Wilde', 'Tom Hanks', 'Penelope Ann Miller', 'Ruth Wilson', 'Tom Holland', 'Nina Dobrev', 'Ciara Bravo', 'Shia LaBeouf', 'Anne Hathaway', 'Alexandra Daddario', 'Amanda Peet', 'Sabrina Bartlett', 'Kiernan Shipka', 'Carey Mulligan', 'Harry Melling', 'Tanya Roberts', 'Jenna Coleman', 'Katee Sackhoff', 'Alexandra Breckenridge', 'Cole Hauser', 'Dove Cameron', 'Bryce Dallas Howard', 'Rachael Harris', 'Jacob Bertrand', 'Denzel Washington', 'Jessy Schram', 'Nicolas Cage', 'Tom Hardy', 'Jennifer Connelly', 'Henry Cavill', 'Chloë Grace Moretz', 'Ruth Gemmell', 'Juno Temple', 'Jennifer Lawrence', 'Margot Robbie', 'Freddie Stroma', 'Christopher Nolan', 'Emily Hampshire', 'Hailee Steinfeld', 'Holly Hunter', 'Kristen Wiig', 'Scarlett Johansson', 'Matilda De Angelis', 'Kelly Reilly', 'Kate Mara', 'Odessa Young', 'Mary Elizabeth Winstead', 'Dan Levy', 'Tom Cruise', 'Amy Adams', 'Ryan Reynolds', 'Millie Bobby Brown', 'Bella Thorne', 'Keanu Reeves', 'Priyanka Chopra', 'Brad Pitt', 'Shirley Eaton', 'Hannah Kepple', 'Claire Foy', 'Brie Larson', 'Liam Neeson', 'Alexander Ludwig', 'Cristin Milioti', 'Gustaf Skarsgård', 'Morena Baccarin', 'Bel Powley', 'Nicole Kidman', 'Kirstie Alley', 'Marielle Heller', 'Taylor Dooley', 'Alison Brie', 'Golda Rosheuvel', 'Annie Murphy', 'Kaley Cuoco', 'Thomas Ian Griffith', 'Ruby Barker', 'Kim Cattrall', 'Rosamund Pike', 'Matthew McConaughey', 'Rebecca Breeds', 'Olivia Cooke', 'Annabelle Wallis', 'Rooney Mara', 'Inbar Lavi', 'Rosario Dawson', 'Kat Dennings', 'Emilia Clarke', 'Josh Ryan Evans', 'Jon Favreau', 'Isabela Merced', 'Chris Evans', 'Lily James', 'Ludivine Sagnier', 'Elliot Page', 'Natalia Dyer', 'Jane Krakowski', 'Ilza Ponko', 'Connie Nielsen', 'Cillian Murphy', 'Jordan Ladd', 'Michael Sheen', 'Rebecca Dalton', 'Regina King', 'Karen Gillan', 'Rachel McAdams', 'Dwayne Johnson', 'Natalie Portman', ]

class Entry {
  constructor(fname, lname) {
    this.fname = fname
    this.lname = lname

  }
  get email() {
    const fullName = this.fname + ' ' + this.lname
    const email = fullName.replace(/\s/g, '.').toLowerCase() + '@mahti.org'
    return email
  }
  get json() {
    return {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      hometown: hometown.hometown,
      courses: courses.course,
      membership: memberships.membership,
    }
  }
}

class PoolHometown {
  constructor(helsinki, espoo, vantaa, muu){
    this.helsinki = helsinki
    this.espoo = espoo
    this.vantaa = vantaa
    this.muu = muu
    this.random = 4
    this.list = ['Helsinki', 'Espoo', 'Vantaa', 'Muu']
  }
  get hometown() {
    const chosen = parseInt(Math.random() * 100) % this.random
    if (this.list[chosen] === 'Helsinki' && this.helsinki > 0) {
      this.helsinki--
      return 'Helsinki'
    } else if (this.list[chosen] === 'Espoo' && this.espoo > 0) {
      this.espoo--
      return 'Espoo'
    } else if (this.list[chosen] === 'Vantaa' && this.vantaa > 0) {
      this.vantaa--
      return 'Vantaa'
    } else if (this.list[chosen] === 'Muu' && this.muu > 0) {
      this.muu--
      return 'Muu'
    } else return this.hometown
  }
}

class PoolCourse {
  constructor(alkeet, alkeetOma, alkeisjatko, jatko, kannatus) {
    this.alkeet = alkeet
    this.alkeetOma = alkeetOma
    this.alkeisjatko = alkeisjatko
    this.jatko = jatko
    this.kannatus = kannatus
    this.courses = ['alkeet', 'alkeetOma', 'alkeisjatko', 'jatko', 'kannatus']
  }
  get course() {
    const chosen = parseInt((Math.random() * 100) % 5)
    if (this.courses[chosen] === 'alkeet' && this.alkeet > 0) {
      this.alkeet--
      return [{
        courseId: 'alkeet',
        paid: this.paid,
        role: this.role
      }]
    } else if (this.courses[chosen] === 'alkeetOma' && this.alkeetOma > 0) {
      this.alkeetOma--
      return [{
        courseId: 'alkeetOma',
        paid: this.paid,
        role: this.role
      }]
    } else if(this.courses[chosen] === 'alkeisjatko' && this.alkeisjatko > 0) {
      this.alkeisjatko--
      return [{
        courseId: 'alkeisjatko',
        paid: this.paid,
        role: this.role
      }]
    } else if(this.courses[chosen] === 'jatko' && this.jatko > 0) {
      this.jatko--
      return [{
        courseId: 'jatko',
        paid: this.paid,
        role: this.role
      }]
    } else if (this.courses[chosen] === 'kannatus' && this.kannatus > 0) {
      this.kannatus--
      return [{
        courseId: 'kannatus',
        paid: this.paid,
        amount: '10'
      }]
    } else {
      return this.course 
    }
  }
  get role() {
    const roles = ['leader' , 'follower']
    return roles[parseInt((Math.random() * 10) % 2)]
  }
  get paid() {
    const paid = [true, true, true, true, true, true, true, true, true, false]
    return paid[parseInt((Math.random()) * 1000) % 10]
  }
}

class PoolMembership {
  constructor(student, club, other) {
    this.student = student
    this.club = club
    this.other = other
    this.memberships = ['opiskelija', 'osakuntalainen', 'other']
  }
  get membership() {
    const chosen = parseInt(Math.random() * 10) % 3

    if (this.memberships[chosen] === 'opiskelija' && this.student > 0) {
      this.student--
      return [{
        student: true,
        club: false,
        hyy: ''
      }]
    } else if (this.memberships[chosen] === 'osakuntalainen' && this.club > 0) {
      this.club--
      return [{
        student: true,
        club: true,
        hyy: ''
      }]
    } else if (this.memberships[chosen] === 'other' && this.other > 0) {
      this.other--
      return [{
        student: false,
        club: false,
        hyy: ''
      }]
    } else {
      return this.membership
    }
  }
}

const hometown = new PoolHometown(77, 42, 7, 22)
const courses = new PoolCourse(30, 48, 32, 23, 16)
const memberships = new PoolMembership(65, 31, 53)

const firstNames = new Array()
const lastNames = new Array()

listOfCelebrities.forEach( name => {
  const splitted = name.split(' ')
  lastNames.push(splitted[splitted.length - 1])
  const fnames = new Array()
  for (let i = 0; i < splitted.length - 1; i++) fnames.push(splitted[i])
  let fname = ''
  fnames.forEach( name => {
    if (fname === '') fname = name
    else fname = fname + ' ' + name
  })
  firstNames.push(fname)
})

export const demoMembers = new Array()

for (let i = 0; i < listOfCelebrities.length; i++) {
  const entry = new Entry(firstNames[i], lastNames[i])
  demoMembers.push(entry.json)
}

export default demoMembers
