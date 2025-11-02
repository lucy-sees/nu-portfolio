import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer select-none",
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
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 
    "onDrag" | "onDragEnd" | "onDragStart" | "onDragCapture" | "onDragEndCapture" | "onDragStartCapture"
  >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
  enableHoverAnimation?: boolean;
  enableClickAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      enableHoverAnimation = true,
      enableClickAnimation = true,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const timelineRef = React.useRef<gsap.core.Timeline>();

    // Combine refs
    React.useImperativeHandle(ref, () => buttonRef.current!);

    React.useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      // Create GSAP timeline for animations
      timelineRef.current = gsap.timeline({ paused: true });

      // Set initial state
      gsap.set(button, { scale: 1, rotationY: 0 });

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHoverAnimation && buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHoverAnimation && buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      onMouseLeave?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableClickAnimation && buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
        });
      }
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableClickAnimation && buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: enableHoverAnimation ? 1.05 : 1,
          duration: 0.1,
          ease: "power2.out",
        });
      }
      onMouseUp?.(e);
    };

    if (asChild) {
      return (
        <Slot
          ref={buttonRef}
          className={cn(buttonVariants({ variant, size, className }))}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={buttonRef}
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
