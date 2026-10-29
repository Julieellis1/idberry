"use client"

import { useState } from "react"

import { COLLECTIONS, CONSULTATION, whatsappLink } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const QUESTIONS = [
  {
    heading: "What's your main goal?",
    answers: ["Even tone", "Clear breakouts", "Fade scars & marks", "All-over glow"],
  },
  {
    heading: "How would you describe your skin?",
    answers: ["Dry", "Oily", "Combination", "Sensitive"],
  },
  {
    heading: "How much time do you want to spend?",
    answers: ["Quick 2 steps", "Full ritual", "Not sure"],
  },
]

/**
 * Recommendation is goal-first: only the answer to question 1 decides the
 * collection. Questions 2 and 3 shape the conversation on WhatsApp, where a
 * cosmetologist can follow up. No product claims, prices or ratings here.
 */
const GOAL_COLLECTION: Record<string, string> = {
  "Even tone": "snow-white",
  "Clear breakouts": "targeted-care",
  "Fade scars & marks": "targeted-care",
  "All-over glow": "caramel-glow",
}

export default function SkinQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const choose = (answer: string) => {
    const next = [...answers, answer]
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setFinished(true)
    }
  }

  const startAgain = () => {
    setAnswers([])
    setStep(0)
    setFinished(false)
  }

  const recommended =
    COLLECTIONS.find((c) => c.handle === GOAL_COLLECTION[answers[0] ?? ""]) ??
    COLLECTIONS[0]

  return (
    <section id="skin-quiz" className="py-10 scroll-mt-20" data-testid="skin-quiz">
      <div className="content-container">
        <div className="rounded-[28px] bg-berry-dark px-6 py-12 small:px-12 small:py-16 text-ivory">
          <div className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-14 items-start">
            <div>
              <span className="uppercase tracking-[0.3em] text-xs text-gold">
                Skin Quiz · 60 Seconds
              </span>
              <h2 className="font-serif text-4xl small:text-5xl mt-3">
                Find the ritual{" "}
                <span className="italic text-gold">made for your skin.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-ivory/80">
                Three quick questions, one personalised recommendation, and a
                cosmetologist on WhatsApp if you&apos;d like a second opinion.
              </p>
              <div
                aria-hidden
                className="mt-8 flex gap-2"
              >
                {QUESTIONS.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 flex-1 rounded-full ${
                      finished || index <= step ? "bg-gold" : "bg-ivory/25"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ivory/70">
                {finished
                  ? "Your recommendation"
                  : `Question ${step + 1} of ${QUESTIONS.length}`}
              </p>
            </div>
            <div>
              {finished ? (
                <div data-testid="skin-quiz-result">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">
                    Based on your main goal
                  </p>
                  <h3 className="font-serif text-3xl small:text-4xl mt-3">
                    {recommended.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ivory/80">
                    {recommended.blurb}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <LocalizedClientLink
                      href={`/collections/${recommended.handle}`}
                      className="inline-flex items-center justify-center rounded-full bg-ivory px-7 py-3 text-sm uppercase tracking-widest text-ink hover:bg-white"
                    >
                      Shop {recommended.title}
                    </LocalizedClientLink>
                    <a
                      href={whatsappLink(CONSULTATION.message)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-ivory/50 px-7 py-3 text-sm uppercase tracking-widest text-ivory hover:bg-white/10"
                    >
                      Second opinion
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={startAgain}
                    className="mt-5 text-sm text-ivory/80 underline underline-offset-4 hover:text-gold"
                  >
                    Start the quiz again
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-3xl small:text-4xl">
                    {QUESTIONS[step].heading}
                  </h3>
                  <div className="mt-6 grid grid-cols-1 xsmall:grid-cols-2 gap-3">
                    {QUESTIONS[step].answers.map((answer) => (
                      <button
                        key={answer}
                        type="button"
                        onClick={() => choose(answer)}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-ivory/30 bg-white/5 px-5 py-4 text-left hover:bg-white/15 transition-colors"
                      >
                        <span>{answer}</span>
                        <span aria-hidden>→</span>
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers(answers.slice(0, -1))
                        setStep(step - 1)
                      }}
                      className="mt-5 text-sm text-ivory/80 underline underline-offset-4 hover:text-gold"
                    >
                      Back
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
