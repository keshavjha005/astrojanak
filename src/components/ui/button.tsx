
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-cosmic text-white hover:bg-cosmic-accent shadow-md hover:shadow-lg hover:scale-105 enhanced-btn-transition",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg hover:scale-105 enhanced-btn-transition",
        secondary: "bg-cosmic/80 text-white hover:bg-cosmic shadow-md hover:shadow-lg hover:scale-105 enhanced-btn-transition",
        outline: "border border-cosmic/30 text-cosmic hover:border-cosmic hover:text-white hover:bg-cosmic/80 shadow-sm hover:shadow-md hover:scale-105 enhanced-btn-transition",
        ghost: "text-cosmic hover:bg-cosmic/10 hover:text-cosmic-accent hover:scale-105 enhanced-btn-transition",
        link: "text-cosmic underline-offset-4 hover:underline hover:text-cosmic-accent enhanced-btn-transition",
        action: "bg-cosmic text-white hover:bg-cosmic-accent shadow-sm hover:shadow-md text-xs px-2 py-1 h-auto enhanced-btn-transition",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-7 text-xs px-2 py-1 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
