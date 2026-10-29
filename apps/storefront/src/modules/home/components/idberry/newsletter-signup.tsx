"use client"

import { useState, type FormEvent } from "react"

import { BRAND } from "@lib/idberry"

/**
 * Newsletter signup is not connected to any list yet. The form sends
 * nothing anywhere and stores nothing; it says so honestly on submit.
 */
export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-10" aria-labelledby="newsletter-heading">
      <div className="content-container">
        <div className="rounded-[28px] bg-blush/40 px-6 py-12 small:px-12 text-center">
          <span className="uppercase tracking-[0.3em] text-xs text-berry">
            The Glow List
          </span>
          <h2
            id="newsletter-heading"
            className="font-serif text-4xl small:text-5xl text-ink mt-3"
          >
            Join the Glow List.
          </h2>
          <p className="mt-4 text-ink/70">
            Skin tips and early access to new drops.
          </p>
          {submitted ? (
            <p className="mx-auto mt-8 max-w-xl leading-relaxed text-ink/80">
              Newsletter signup is not connected yet. Email{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-berry underline underline-offset-4 hover:text-berry-dark"
              >
                {BRAND.email}
              </a>{" "}
              to join the Glow List.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex max-w-xl flex-col xsmall:flex-row gap-3"
            >
              <label htmlFor="glow-list-email" className="sr-only">
                Your email address
              </label>
              <input
                id="glow-list-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className="w-full flex-1 rounded-full border border-berry/30 bg-white px-6 py-3 text-ink placeholder:text-ink/50 focus:border-berry focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-berry-dark px-8 py-3 text-sm uppercase tracking-widest text-ivory hover:bg-berry"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-5 text-sm text-ink/60">
            We respect your inbox. Unsubscribe anytime; we never share your
            details.
          </p>
        </div>
      </div>
    </section>
  )
}
