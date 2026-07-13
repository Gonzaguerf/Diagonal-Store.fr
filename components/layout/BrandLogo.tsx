import { cn } from "@/lib/utils/cn";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "small";
}

export function BrandLogo({ className, variant = "default" }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "font-glitch tracking-tight text-bone-100 select-none",
        variant === "default" ? "text-2xl sm:text-3xl" : "text-xl",
        className,
      )}
      aria-label="DIAGONAL"
    >
      DIAGONAL
    </span>
  );
}
