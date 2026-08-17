import { cn } from "@/lib/utils";

type TechBadgeProps = {
  label: string;
  className?: string;
};

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] leading-5 text-fg-mid transition-colors duration-200 hover:border-line-bright hover:text-fg",
        className
      )}
    >
      {label}
    </span>
  );
}
