import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-red-500 text-red-900",
        success:
          "border-transparent bg-green-500 text-white",
        warning:
          "border-transparent bg-yellow-400 text-white",
        primary:
          "border-transparent bg-blue-400 text-blue-900",
        orange:
          "border-transparent bg-orange-400 text-orange-900",
        violet:
          "border-transparent bg-violet-400 text-violet-900",
        purple:
          "border-transparent bg-purple-400 text-purple-900",
        cyan:
          "border-transparent bg-cyan-400 text-cyan-900",
        teal:
          "border-transparent bg-teal-400 text-teal-900",
        emerald:
          "border-transparent bg-emerald-400 text-emerald-900",
        lime:
          "border-transparent bg-lime-400 text-lime-900",
        amber:
          "border-transparent bg-amber-400 text-amber-900",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
