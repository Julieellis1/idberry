import { slugify, stripInlineMarkdown } from "@lib/journal"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import React from "react"
import remarkGfm from "remark-gfm"

const textOf = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (React.isValidElement(node)) {
    return textOf((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

type P<T extends keyof React.JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>

/** Styled element map for article bodies (no Tailwind typography plugin needed). */
const components = {
  h2: ({ children, ...props }: P<"h2">) => (
    <h2
      id={slugify(stripInlineMarkdown(textOf(children)))}
      className="font-serif text-3xl small:text-4xl text-berry mt-12 mb-4 scroll-mt-32"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: P<"h3">) => (
    <h3
      id={slugify(textOf(children))}
      className="font-serif text-2xl text-berry mt-8 mb-3 scroll-mt-32"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props: P<"p">) => <p className="my-5 leading-relaxed text-ink/85" {...props} />,
  ul: (props: P<"ul">) => (
    <ul className="my-5 list-disc pl-6 flex flex-col gap-2 text-ink/85 marker:text-gold" {...props} />
  ),
  ol: (props: P<"ol">) => (
    <ol className="my-5 list-decimal pl-6 flex flex-col gap-2 text-ink/85 marker:text-gold" {...props} />
  ),
  li: (props: P<"li">) => <li className="leading-relaxed pl-1" {...props} />,
  strong: (props: P<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props: P<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-gold pl-6 font-serif italic text-2xl text-berry"
      {...props}
    />
  ),
  a: ({ href = "", children, ...props }: P<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-berry underline decoration-gold underline-offset-4" {...props}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-berry underline decoration-gold underline-offset-4"
        {...props}
      >
        {children}
      </a>
    ),
  hr: () => <hr className="my-10 border-blush" />,
  table: (props: P<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: P<"th">) => (
    <th className="border-b border-gold text-left p-2 font-semibold text-berry" {...props} />
  ),
  td: (props: P<"td">) => <td className="border-b border-blush p-2 align-top" {...props} />,
}

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        blockJS: true,
        mdxOptions: { remarkPlugins: [remarkGfm] },
      }}
    />
  )
}
