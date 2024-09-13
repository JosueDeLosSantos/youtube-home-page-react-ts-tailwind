import { cva, VariantProps } from "cva";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

// cva(["classes for all components"], {classes for specific components})
export const buttonStyles = cva(["transition-colors"], {
  variants: {
    // styles
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    // sizes
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "size-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
