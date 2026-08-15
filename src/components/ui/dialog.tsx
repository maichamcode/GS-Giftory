"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-foreground/45 backdrop-blur-[2px]"
        aria-label="Đóng hộp thoại"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "animate-soft-rise relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-[2rem] bg-surface p-6 shadow-lifted sm:max-w-xl sm:rounded-[2rem] sm:p-8",
          className,
        )}
      >
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          aria-label="Đóng"
          onClick={onClose}
        >
          <X className="size-5" aria-hidden="true" />
        </Button>
        <div className="pr-12">
          <h2 id={titleId} className="font-display text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
