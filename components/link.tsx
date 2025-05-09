import type React from "react"
import NextLink from "next/link"
import { cn } from "@/lib/utils"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  underline?: boolean
  children: React.ReactNode
}

export default function Link({ href, className, underline = false, children, ...props }: LinkProps) {
  const isExternal = href.startsWith("http")

  const baseClass = cn("transition-colors", underline ? "hover:underline" : "", className)

  if (isExternal) {
    return (
      <a href={href} className={baseClass} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={baseClass} {...props}>
      {children}
    </NextLink>
  )
}
