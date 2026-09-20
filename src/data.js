
const icon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`

export const personal = {
  name: 'Nikhil',
  initials: 'N.',
  role: 'MERN stack developer',
  location: 'Jaipur, India',
  status: 'Open to internships and junior roles',
  email: 'nikhil121.work@example.com',
  resume: 'ResumeNikhil.pdf', 
  intro:
    'I build full-stack web apps with MongoDB, Express, React and Node. I care about clean interfaces and code that is easy to read.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Nikhil-Chaudhary121' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nikhil-chaudhary-8b8976433/' },
    { label: 'X', url: 'https://x.com/Nikhil_1e' },
  ],
}


export const skills = [
  {
    name: 'JavaScript',
    category: 'Language',
    description: 'ES6+, async patterns, and the fundamentals underneath every framework.',
    img: icon('javascript'),
  },
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component-driven interfaces with hooks, routing and state management.',
    img: icon('react'),
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Server-side JavaScript, REST APIs and authentication.',
    img: icon('nodejs'),
  },
  {
    name: 'Express',
    category: 'Backend',
    description: 'Routing, middleware and clean API structure.',
    img: icon('express'),
  },
  {
    name: 'MongoDB',
    category: 'Database',
    description: 'Schema design, Mongoose models and aggregation queries.',
    img: icon('mongodb'),
  },
  {
    name: 'React Native',
    category: 'Mobile',
    description: 'Cross-platform mobile apps built with Expo.',
    img: icon('react'),
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    description: 'Utility-first styling for fast, consistent, responsive layouts.',
    img: icon('tailwindcss'),
  },
  {
    name: 'Git and GitHub',
    category: 'Tooling',
    description: 'Version control, branching and collaborative workflows.',
    img: icon('git'),
  },
]

// Each project becomes one card that rises from the bottom.
export const projects = [
  {
    title: 'Job Tracker',
    year: '2026',
    description:
      'A full-stack app to track job and internship applications: statuses, notes and follow-up dates in one dashboard.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/job-tracker.png', // "/projects/job-tracker.png"
    live: '',
    github: '',
  },
  {
    title: 'Thread Clone',
    year: '2025',
    description:
      'A full stack thead clone have auth system , user can create like share comment on post.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/projects/project3.png', // "/projects/job-tracker.png"
    live: '',
    github: '',
  },
  {
    title: 'Chatter Hub',
    year: '2025',
    description:
      'A real time Chat app that can handle msg in real time using socket.io',
    tech: ['React', 'Express', 'MongoDB' , "Socket.io" , 'Node.js'],
    image: '',
    live: '',
    github: '',
  },
  {
    title: 'Air Bnb Clone',
    year: '2025',
    description:
      'WunderList air bnb like web app, user can create, filter, find, edit, delete listings  ',
    tech: ['html', 'css', 'js' , "mongodb" , 'cloudnariy'],
    image: '/projects/project4.png',
    live: '',
    github: '',
  },

  {
    title: 'Appointment Booking System (Working)',
    year: '2026',
    description:
      'A full stack app to book appointments ,  role-based access, time-slot management, booking and cancellation',
    tech: ['React',"TypeScript", 'PSql' ,'Express.js','GSAP'],
    image: '',
    live: '',
    github: '',
  },
]

export const about = {
  image: 'me.png', // "/me.jpg" (portrait, roughly 4:5 works best)
  heading: 'I like building things that are simple to use and solid underneath.',
  paragraphs: [
    'I am a full-stack developer based in Jaipur. I work across the MERN stack, from database schemas and APIs to the interface people actually touch.',
    'I learn by building, so most of what I know comes from shipping small projects end to end. Write a few honest lines about yourself here.',
  ],
  stats: [
    { value: '6+', label: 'Projects built' },
    { value: 'MERN', label: 'Main stack' },
    { value: '2024', label: 'Building since' },
  ],
  // Optional: remove this array to hide the list.
  timeline: [
    // { year: '2026', title: 'Full-stack projects', place: 'Self-directed' },
    { year: '2025', title: 'BCA', place: 'Chandigarh University' },
  ],
}

export const contact = {
  heading: 'Have a project or a role in mind? Let us talk.',
  text: 'Send a message and I will reply within a couple of days.',
  // Optional: paste a Formspree (or similar) endpoint to send the form directly.
  // Left empty, the form opens the visitor's email app instead.
  formEndpoint: '',
}
