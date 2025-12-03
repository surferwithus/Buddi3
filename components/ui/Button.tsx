import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const variantClasses: Record<string, string> = {
  default: "bg-white text-black hover:bg-white/90",
  outline: "border border bg-white/20 hover:bg-white/30",
  secondary: "bg-background text-[#333333] hover:bg-background/80",
  search: "bg-orange-400 text-white hover:bg-orange-300 h-[43px] text-[18px]",
};

const sizeClasses: Record<string, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3",
  lg: "h-11 rounded-lg px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  href?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "default", size = "default", className, href, asChild, children, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={baseClasses}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={baseClasses}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
