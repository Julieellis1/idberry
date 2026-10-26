export default function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) {
    return null
  }
  return (
    <aside
      aria-labelledby="key-takeaways"
      className="rounded-2xl border border-gold/50 bg-blush/30 p-6 small:p-8"
    >
      <h2
        id="key-takeaways"
        className="font-serif text-2xl text-berry mb-4"
      >
        Key takeaways
      </h2>
      <ul className="flex flex-col gap-3 text-ink/80 leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-gold mt-0.5" aria-hidden>
              ✦
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
