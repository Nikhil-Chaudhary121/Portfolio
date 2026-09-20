# Portfolio

React + Vite, animated with GSAP ScrollTrigger and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Add your content

Everything is in `src/data.js`: personal info, skills (with images), projects,
about text, and contact settings. You do not need to touch the components.

- Skill icons: image URL, or a file in `public/skills/` (`img: '/skills/react.png'`)
- Project screenshots: file in `public/projects/` (`image: '/projects/app.png'`)
- Your photo: any file in `public/` (`about.image: '/me.jpg'`)
- Resume button: put a PDF in `public/` and set `personal.resume`
- Contact form: paste a Formspree endpoint into `contact.formEndpoint`.
  Left empty, the form opens the visitor's email app.

## Where the animation lives

| What | File |
| --- | --- |
| Loading screen (counter, name, curtain) | `components/Loader.jsx` |
| Skills vertical slide (pinned, GSAP) | `components/Skills.jsx` |
| Projects rising bottom to top (pinned, GSAP) | `components/Projects.jsx` |
| Text reveal used across sections | `components/Mask.jsx` |
| Colors, fonts, spacing | top of `src/index.css` |

Tweak scroll length in Skills/Projects via the `end:` value, and remove the
`snap:` block if you prefer free scrolling instead of snapping slide to slide.
