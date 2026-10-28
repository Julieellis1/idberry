"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { useSearchParams } from "next/navigation"

const STEPS = [
  { key: "address", label: "Address" },
  { key: "delivery", label: "Delivery" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
]

/**
 * Visual step indicator only. It reads the current ?step= value and
 * highlights the active and completed steps. It changes no step logic.
 */
const StepIndicator = () => {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") ?? "address"
  const currentIndex = Math.max(
    0,
    STEPS.findIndex((step) => step.key === currentStep)
  )

  return (
    <ol
      aria-label="Checkout steps"
      className="flex items-center gap-2 small:gap-3"
    >
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex
        const isCurrent = index === currentIndex
        return (
          <li key={step.key} className="flex flex-1 items-center gap-2 small:gap-3 last:flex-none">
            <span
              className={clx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                isDone || isCurrent
                  ? "border-berry bg-berry text-ivory"
                  : "border-blush bg-white text-ui-fg-subtle"
              )}
            >
              {isDone ? <CheckCircleSolid /> : index + 1}
            </span>
            <span
              className={clx(
                "text-sm",
                isCurrent
                  ? "font-semibold text-berry"
                  : "text-ui-fg-subtle"
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={clx(
                  "h-px flex-1",
                  index < currentIndex ? "bg-berry" : "bg-blush"
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default StepIndicator
