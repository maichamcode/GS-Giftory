import Image from "next/image";
import { Music2, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GiftPalette, GiftTypography } from "@/types/gift";

const paletteClasses: Record<GiftPalette, string> = {
  blush: "gift-palette-blush",
  sunset: "gift-palette-sunset",
  sage: "gift-palette-sage",
  midnight: "gift-palette-midnight",
};

const typographyClasses: Record<GiftTypography, string> = {
  serif: "font-display",
  modern: "font-sans",
  handwritten: "font-display italic",
};

export function GiftPreview({
  senderName,
  recipientName,
  message,
  imageUrl,
  fallbackImageUrl,
  audioUrl,
  audioName,
  palette,
  typography,
  compact = false,
}: {
  senderName: string;
  recipientName: string;
  message: string;
  imageUrl?: string;
  fallbackImageUrl: string;
  audioUrl?: string;
  audioName?: string;
  palette: GiftPalette;
  typography: GiftTypography;
  compact?: boolean;
}) {
  const displayedImage = imageUrl || fallbackImageUrl;

  return (
    <article
      className={cn(
        "gift-preview relative isolate overflow-hidden rounded-[2rem] p-4 shadow-lifted sm:p-6",
        paletteClasses[palette],
        compact ? "max-w-md" : "w-full max-w-xl",
      )}
    >
      <span className="gift-orb gift-orb-one" aria-hidden="true" />
      <span className="gift-orb gift-orb-two" aria-hidden="true" />
      <div className="relative z-10 rounded-[1.55rem] border border-white/50 bg-white/82 p-3 shadow-soft backdrop-blur-sm sm:p-4">
        <div className={cn("relative overflow-hidden rounded-[1.2rem] bg-surface-soft", compact ? "aspect-[4/3]" : "aspect-[5/4]")}>
          <Image
            src={displayedImage}
            alt={recipientName ? `Khoảnh khắc dành tặng ${recipientName}` : "Ảnh trong món quà"}
            fill
            unoptimized={displayedImage.startsWith("data:") || displayedImage.startsWith("blob:")}
            sizes="(max-width: 768px) calc(100vw - 4rem), 560px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white/90">
            Một món quà dành cho {recipientName || "người thương"}
          </p>
        </div>
        <div className={cn("px-2 pb-2 text-center", compact ? "pt-5" : "pt-7 sm:px-6")}>
          <Quote className="mx-auto size-5 fill-current text-[var(--gift-accent)]" aria-hidden="true" />
          <p
            className={cn(
              "mx-auto mt-3 whitespace-pre-wrap text-balance leading-relaxed text-[var(--gift-ink)]",
              typographyClasses[typography],
              compact ? "line-clamp-4 text-xl" : "max-w-md text-2xl sm:text-3xl",
            )}
          >
            {message || "Lời chúc của bạn sẽ xuất hiện ở đây — thật riêng, thật gần."}
          </p>
          <div className="mx-auto mt-5 h-px w-12 bg-[var(--gift-accent)]/35" />
          <p className="mt-4 text-sm font-bold text-[var(--gift-ink)]/75">
            Từ {senderName || "một người luôn nghĩ về bạn"}
          </p>
          {audioUrl ? (
            <div className="mt-5 rounded-2xl bg-white/65 p-3 text-left">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold text-[var(--gift-ink)]/70">
                <Music2 className="size-3.5" aria-hidden="true" /> {audioName || "Giai điệu dành tặng bạn"}
              </p>
              <audio className="h-9 w-full" controls preload="metadata" src={audioUrl}>
                Trình duyệt của bạn chưa hỗ trợ phát âm thanh.
              </audio>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
