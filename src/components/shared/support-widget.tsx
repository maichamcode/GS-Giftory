"use client";

import {
  ExternalLink,
  Headphones,
  MessageCircle,
  MessagesSquare,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const supportChannels = [
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/",
    icon: MessageCircle,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: MessagesSquare,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/",
    icon: Video,
  },
] as const;

const supportPanelId = "support-contact-panel";
const supportPanelTitleId = "support-contact-title";

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [open]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Đóng liên hệ hỗ trợ" : "Liên hệ hỗ trợ"}
        aria-haspopup="dialog"
        aria-controls={supportPanelId}
        aria-expanded={open}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="grid size-14 place-items-center rounded-full border-4 border-white/80 bg-brand text-white shadow-lifted transition duration-200 hover:-translate-y-1 hover:bg-brand-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand sm:size-16"
      >
        {open ? (
          <X className="size-6 sm:size-7" aria-hidden="true" />
        ) : (
          <Headphones className="size-6 sm:size-7" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div
          className="absolute bottom-[calc(100%+0.875rem)] right-0 w-72 max-w-[calc(100vw-2.5rem)] sm:w-80"
        >
          <span
            aria-hidden="true"
            className="absolute -bottom-2 right-5 size-4 rotate-45 border-b border-r border-line bg-background sm:right-6"
          />
          <section
            id={supportPanelId}
            role="dialog"
            aria-modal="false"
            aria-labelledby={supportPanelTitleId}
            className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl border border-line bg-background p-4 shadow-lifted sm:p-5"
          >
            <div>
              <h2
                id={supportPanelTitleId}
                className="font-display text-xl font-bold text-foreground"
              >
                Liên hệ hỗ trợ
              </h2>
            </div>

            <div className="mt-4 grid gap-2">
              {supportChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Liên hệ hỗ trợ qua ${channel.label} (mở trong tab mới)`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-soft p-3 transition hover:border-brand/45 hover:bg-brand-soft/55 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-foreground">
                        {channel.label}
                      </span>
                    </span>
                    <ExternalLink
                      className="size-4 shrink-0 text-muted transition group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
