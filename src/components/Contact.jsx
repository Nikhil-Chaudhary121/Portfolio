import { useState } from 'react'
import { motion } from 'framer-motion'
import Mask from './Mask'
import { contact, personal } from '../data'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // No endpoint set: fall back to the visitor's email app
    if (!contact.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`)
      const body = encodeURIComponent(`${data.message}\n\n${data.name} (${data.email})`)
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">
        <Mask inView>{contact.heading}</Mask>
      </h2>

      <div className="contact-grid">
        <div className="contact-side">
          <p>{contact.text}</p>
          <a className="contact-mail" href={`mailto:${personal.email}`}>
            {personal.email}
          </a>
          <ul className="contact-social">
            {personal.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Your email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required />
          </div>

          <motion.button
            type="submit"
            className="btn btn-solid"
            disabled={status === 'sending'}
            whileTap={{ scale: 0.97 }}
          >
            {status === 'sending' ? 'Sending' : 'Send message'}
          </motion.button>

          <p className="form-status" role="status" aria-live="polite">
            {status === 'sent' && 'Message sent. I will reply soon.'}
            {status === 'error' && `The message did not send. Email me directly at ${personal.email}.`}
          </p>
        </form>
      </div>
    </section>
  )
}
