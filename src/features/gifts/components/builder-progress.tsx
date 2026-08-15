import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const builderSteps = [
  "Chọn mẫu",
  "Lời chúc",
  "Ảnh & nhạc",
  "Phong cách",
  "Xem trước",
  "Xác nhận",
] as const;

export function BuilderProgress({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Tiến trình tạo quà" className="overflow-x-auto pb-2">
      <ol className="flex min-w-[42rem] items-center">
        {builderSteps.map((label, index) => {
          const step = index + 1;
          const completed = step < currentStep;
          const active = step === currentStep;
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-extrabold transition",
                    completed && "border-forest bg-forest text-white",
                    active && "border-brand bg-brand text-white shadow-[0_0_0_4px_rgba(199,95,136,.14)]",
                    !completed && !active && "border-line bg-surface text-muted",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {completed ? <Check className="size-4" aria-hidden="true" /> : step}
                </span>
                <span className={cn("text-xs font-bold", active ? "text-foreground" : "text-muted")}>{label}</span>
              </div>
              {step < builderSteps.length ? (
                <span className={cn("mx-3 h-px flex-1", completed ? "bg-forest/45" : "bg-line")} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
