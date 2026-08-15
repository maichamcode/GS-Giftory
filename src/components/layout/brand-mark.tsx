import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-grid size-10 place-items-center rounded-[0.9rem] bg-brand text-white shadow-[0_8px_18px_rgba(199,95,136,.26)]">
        <Gift className="size-5" strokeWidth={2.2} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-background bg-[#f1b54a]" />
      </span>
      {!compact ? (
        <span className="font-display text-[1.7rem] font-semibold tracking-[-0.045em]">Giftory</span>
      ) : null}
    </span>
  );
}
