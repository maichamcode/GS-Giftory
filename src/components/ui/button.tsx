import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-brand text-white shadow-[0_10px_24px_rgba(199,95,136,.24)] hover:bg-brand-hover",
    secondary:
      "bg-forest text-white shadow-[0_10px_24px_rgba(52,92,75,.16)] hover:bg-forest-hover",
    outline: "border border-line bg-surface/80 text-foreground hover:bg-surface-soft",
    ghost: "text-foreground hover:bg-surface-soft",
    danger: "bg-danger text-white hover:brightness-90",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-6 text-base",
    icon: "size-11 p-0",
  };

  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold transition duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
    variants[variant],
    sizes[size],
    className,
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
});
