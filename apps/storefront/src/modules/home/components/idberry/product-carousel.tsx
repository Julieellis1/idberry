"use client"

import { useRef, type ReactNode } from "react"

/** Horizontal scroll row with arrow buttons and a thin scroll track. */
export default function ProductCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) {
      return
    }
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <div>
      <div className="flex justify-end gap-3 mb-6">
        <button
          type="button"
          aria-label="Scroll products left"
          onClick={() => scrollBy(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-berry/40 bg-white text-berry hover:bg-berry hover:text-ivory transition-colors"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          aria-label="Scroll products right"
          onClick={() => scrollBy(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-berry/40 bg-white text-berry hover:bg-berry hover:text-ivory transition-colors"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {children}
      </div>
      <div aria-hidden className="mt-4 h-1 w-full rounded-full bg-blush/60" />
    </div>
  )
}
