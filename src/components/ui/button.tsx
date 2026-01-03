import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: Readonly<ButtonProps>) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full";
  
  const variants = {
    primary: "bg-[--color-primary] hover:bg-[--color-primary-dark] text-white dark:bg-[--color-primary] dark:hover:bg-[--color-primary-dark] dark:text-white shadow-sm hover:shadow-md",
    secondary: "bg-[--color-accent] hover:opacity-90 text-[#0a2540] dark:bg-[--color-accent] dark:text-[#0a2540] shadow-sm hover:shadow-md",
    outline: "border-2 border-[#0173e7] text-[#0173e7] hover:bg-[#0173e7] hover:text-white dark:border-[#3b9eff] dark:text-[#3b9eff] dark:hover:bg-[#3b9eff] dark:hover:text-[#0a2540]",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-6 py-2 text-sm",
  };
  
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
