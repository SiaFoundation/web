type Member = {
  name: string
  title: string
  image?: string
  twitter?: string
  github?: string
  linkedin?: string
  description: string
}

export default [
  {
    name: 'Luke',
    image: 'luke',
    title: 'President & Core Developer',
    twitter: 'lukechampine',
    github: 'lukechampine',
  },
  {
    name: 'Frances',
    image: 'frances',
    title: 'Director of Operations',
    linkedin: 'frances-lu-066762123',
  },
  {
    name: 'Kino',
    image: 'kino',
    title: 'Community Manager',
    github: 'kinomora',
  },
  {
    name: 'Nate',
    image: 'nate',
    twitter: 'n8maninger',
    github: 'n8maninger',
    title: 'Core Developer',
  },
  {
    name: 'Chris',
    image: 'chris',
    github: 'chris124567',
    title: 'Core Developer',
  },
  {
    name: 'Alex',
    image: 'alex',
    title: 'Product Engineer',
    twitter: 'alexfreska',
    github: 'alexfreska',
  },
  {
    name: 'Eddie',
    image: 'eddie',
    twitter: 'eddiepluswang',
    github: 'eddiewang',
    title: 'Chairman',
  },
  {
    name: 'Josh Cincinatti',
    image: 'josh',
    twitter: 'acityinohio',
    github: 'acityinohio',
    title: 'Advisor',
  },
  {
    name: 'James Prestwich',
    image: 'james',
    twitter: '_prestwich',
    github: 'prestwich',
    title: 'Advisor',
  },
] as Member[]
