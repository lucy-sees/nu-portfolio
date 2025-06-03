import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, PanInfo } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "neon-button-pink bg-gradient-to-r from-[#FF1A75] to-[#9D00FF] hover:shadow-neon-pink-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-400/20 hover:border-cyan-400/40",
        ghost: "hover:bg-cyan-400/10 text-cyan-400 hover:shadow-neon-cyan",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300",
        outline: `
          border-2 border-primary 
          bg-transparent text-primary
          hover:bg-primary/10
          focus:outline focus:outline-2 focus:outline-secondary `,
        gradientOutline: `
          border-2 border-primary
          relative before:absolute before:inset-0 
          before:bg-[linear-gradient(45deg,transparent_50%,hsl(var(--primary))_100%)]
          before:opacity-30 hover:before:opacity-50 `,
        gradient: `
            bg-gradient-to-r from-[#FF1A75] to-[#9D00FF] 
            hover:shadow-neon-pink-lg
            before:absolute before:inset-0 before:bg-[length:200%_200%] 
            before:animate-shimmer before:-z-[1] before:opacity-50
        `,
        neon: `
            bg-cyan-500/10 text-cyan-400 border-2 border-cyan-400/30
            hover:border-cyan-400/60 hover:bg-cyan-500/20
            neon-glow-cyan hover:shadow-neon-cyan-lg
        `,
        cyber: `
            clip-cyber-border bg-[#FF1A75] text-white 
            before:absolute before:inset-0 before:bg-cyan-400/20
            hover:before:opacity-40
            after:absolute after:inset-[2px] after:bg-black
        `,
      },
      size: {
        default: "h-12 px-6 py-4 rounded-lg",
        sm: "h-10 px-5 py-3 rounded-md",
        lg: "h-14 px-8 py-5 rounded-xl",
        icon: "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
  onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      onDragStart,
      onDragEnd,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : motion.button;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        type={type}
        drag // Enable drag functionality
        dragConstraints={{ left: 0, right: 0 }} // Constrain drag movement
        onDragStart={onDragStart} // Use Framer Motion's onDragStart
        onDragEnd={onDragEnd} // Use Framer Motion's onDragEnd
        {...props} // Spread remaining props safely
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
