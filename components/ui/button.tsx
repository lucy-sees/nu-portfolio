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