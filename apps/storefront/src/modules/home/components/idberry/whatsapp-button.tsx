import { CONSULTATION, whatsappLink } from "@lib/idberry"

/** Floating WhatsApp chat button, rendered on every (main) page. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(CONSULTATION.message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with IDBERRY on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      data-testid="whatsapp-button"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden>
        <path d="M16.004 3C9.374 3 4 8.373 4 15.001c0 2.116.555 4.18 1.608 6.003L4 29l8.193-1.574A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15.001 28 8.373 22.63 3 16.004 3Zm0 21.818a9.79 9.79 0 0 1-5.002-1.37l-.358-.213-4.862.934.965-4.735-.233-.373a9.77 9.77 0 0 1-1.5-5.06c0-5.417 4.41-9.818 9.99-9.818 5.418 0 9.817 4.401 9.817 9.818 0 5.416-4.4 9.817-8.817 9.817Zm5.387-7.353c-.295-.148-1.747-.862-2.018-.96-.27-.1-.468-.149-.665.148-.197.295-.763.96-.936 1.157-.172.197-.345.222-.64.074-.296-.148-1.248-.46-2.377-1.467-.879-.784-1.472-1.752-1.645-2.048-.172-.296-.018-.456.13-.603.133-.133.296-.345.443-.518.148-.172.197-.295.296-.492.099-.197.05-.37-.025-.518-.074-.148-.665-1.602-.911-2.194-.24-.576-.484-.498-.665-.507l-.567-.01a1.09 1.09 0 0 0-.788.37c-.271.296-1.035 1.011-1.035 2.466 0 1.454 1.06 2.86 1.207 3.057.148.197 2.085 3.183 5.05 4.463.706.305 1.256.487 1.686.623.708.225 1.353.193 1.862.117.568-.085 1.747-.714 1.994-1.404.246-.69.246-1.281.172-1.404-.074-.123-.271-.197-.567-.345Z" />
      </svg>
    </a>
  )
}
