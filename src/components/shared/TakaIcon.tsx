import { cn } from "@/lib/utils";

interface TakaIconProps {
  className?: string;
}

// Custom Bangladeshi Taka symbol to replace lucide-react's DollarSign everywhere
export function TakaIcon({ className }: TakaIconProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold leading-none",
        className
      )}
    >
      ৳
    </span>
  );
}