"use client";

import Image from "next/image";
import {
  ArrowRight,
  CakeSlice,
  Flower2,
  Gift,
  Heart,
  ImageIcon,
  Mail,
  PartyPopper,
  RefreshCcw,
  Ribbon,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import type { BirthdayExperienceConfig } from "@/features/experiences/birthday/birthday-experience-config";
import { cn } from "@/lib/utils";

interface StepProps {
  config: BirthdayExperienceConfig;
  onNext: () => void;
}

export function StartStep({ onStart }: { onStart: () => void }) {
  return (
    <section className="experience-screen px-5 pb-10 pt-28 text-center sm:px-8 sm:pt-32">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center">
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[var(--birthday-ink)] sm:text-6xl">
          Một bất ngờ nhỏ<br />đang chờ được mở
        </h1>

        <div className="birthday-cake-stage mt-8" aria-label="Bánh sinh nhật với nến lung linh và những hộp quà">
          <Gift className="birthday-side-gift birthday-side-gift-left" aria-hidden="true" />
          <Gift className="birthday-side-gift birthday-side-gift-right" aria-hidden="true" />
          <div className="birthday-cake" aria-hidden="true">
            <div className="birthday-candle-row">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="birthday-candle"><span className="birthday-flame" /></span>
              ))}
            </div>
            <div className="birthday-cake-top"><span /><span /><span /></div>
            <div className="birthday-cake-bottom"><span /><span /><span /><span /></div>
            <div className="birthday-cake-plate" />
          </div>
        </div>

        <Button size="lg" className="mt-8 min-w-52" onClick={onStart}>
          <PartyPopper className="size-5" aria-hidden="true" /> Nhấn để bắt đầu
        </Button>
      </div>
    </section>
  );
}

export function GreetingStep({ config, onNext }: StepProps) {
  return (
    <section className="experience-screen px-5 pb-12 pt-28 text-center sm:px-8 sm:pt-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <CakeSlice className="experience-reveal size-11 text-brand sm:size-14" aria-hidden="true" />
        <p className="experience-reveal experience-delay-one mt-7 font-display text-3xl font-semibold text-[var(--birthday-ink)] sm:text-5xl">
          Chúc mừng sinh nhật
        </p>
        <h1 className="experience-reveal experience-delay-two mt-5 text-balance font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-brand sm:text-7xl lg:text-8xl">
          {config.recipientName}
        </h1>
        <p className="experience-reveal experience-delay-three mt-6 font-display text-3xl italic text-[var(--birthday-purple)] sm:text-5xl">
          Happy Birthday
        </p>
        <div className="experience-reveal experience-delay-four mt-10">
          <Button size="lg" onClick={onNext}>
            <Heart className="size-5 fill-current" aria-hidden="true" /> Mở món quà tiếp theo
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LetterStep({ config, onNext }: StepProps) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterOpening, setLetterOpening] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const openTimerRef = useRef<number | null>(null);
  const letterComplete = typedLength >= config.letter.length;

  useEffect(() => {
    if (!letterOpen || letterComplete) return;
    const timer = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= config.letter.length) {
          window.clearInterval(timer);
          return current;
        }
        return Math.min(current + 1, config.letter.length);
      });
    }, 18);
    return () => window.clearInterval(timer);
  }, [config.letter.length, letterComplete, letterOpen]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    };
  }, []);

  const openLetter = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedLength(config.letter.length);
      setLetterOpen(true);
      return;
    }
    setLetterOpening(true);
    openTimerRef.current = window.setTimeout(() => {
      setTypedLength(0);
      setLetterOpen(true);
      setLetterOpening(false);
    }, 720);
  };

  return (
    <section className="experience-screen px-4 pb-10 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <p className="experience-kicker"><Mail className="size-3.5" /> Một bức thư dành riêng cho em</p>

        {!letterOpen ? (
          <div className="mt-10 flex flex-col items-center">
            <div className={cn("birthday-envelope", letterOpening && "is-opening")} aria-label={letterOpening ? "Phong thư đang mở" : "Phong thư chưa mở"}>
              <span className="birthday-envelope-back" />
              <span className="birthday-envelope-paper" />
              <span className="birthday-envelope-front" />
              <span className="birthday-envelope-seal"><Heart className="size-5 fill-current" /></span>
            </div>
            <Button size="lg" className="mt-9" onClick={openLetter} disabled={letterOpening}>
              <Heart className="size-5 fill-current" aria-hidden="true" /> {letterOpening ? "Đang mở..." : "Open"}
            </Button>
          </div>
        ) : (
          <article className="birthday-letter-paper mt-7 w-full text-left">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-brand/15 pb-3">
              {/* <p className="font-display text-xl font-semibold text-brand">Gửi {config.recipientName},</p> */}
              <p className="font-display text-xl font-semibold text-brand">Gửi embe của tui,</p>
              {/* {config.letterIsPlaceholder ? <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold text-brand">Nội dung mẫu</span> : null} */}
            </div>
            <div className="max-h-[min(44svh,24rem)] overflow-y-auto overscroll-contain pr-2">
              <p className="whitespace-pre-wrap font-display text-lg leading-8 text-[var(--birthday-ink)] sm:text-xl sm:leading-9">
                {config.letter.slice(0, typedLength)}
                {!letterComplete ? <span className="typing-cursor" aria-hidden="true" /> : null}
              </p>
              {letterComplete ? (
                <>
                  <div className="experience-reveal ml-auto mt-7 w-fit min-w-36 pr-3 text-center">
                    <p className="text-sm italic text-[var(--birthday-muted)]">
                      {config.letterSignature.label}
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold italic text-brand sm:text-3xl">
                      {config.letterSignature.name}
                    </p>
                  </div>
                  <div className="experience-reveal mt-6 border-t border-brand/15 pt-5 text-center">
                    <Button onClick={onNext}><ArrowRight className="size-4" /></Button>
                  </div>
                </>
              ) : null}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

export function AlbumStep({ config, onNext }: StepProps) {
  return (
    <section className="birthday-scrapbook relative min-h-svh overflow-x-clip px-4 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28">
      <ScrapbookSideDecorations />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <h1 className="sr-only">Happy Birthday — Album kỷ niệm của {config.recipientName}</h1>
        <BirthdayBunting />
        <p className="mx-auto mt-4 max-w-md text-center font-display text-sm italic leading-6 text-[var(--birthday-muted)] sm:text-base">
          Những tấm ảnh nhỏ, những điều thật lâu — dành riêng cho {config.recipientName}.
        </p>

        <div className="scrapbook-album mt-10 sm:mt-14">
          {config.images.map((image, index) => (
            <ScrapbookPolaroid key={`${image.src}-${index}`} image={image} index={index} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-xl text-center sm:mt-24">
          <div className="flex">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/75 text-brand shadow-soft"><Heart className="size-5 fill-current" /></span>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/75 text-brand shadow-soft"><Heart className="size-5 fill-current" /></span>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/75 text-brand shadow-soft"><Heart className="size-5 fill-current" /></span>
          </div>
          <Button className="mt-6" onClick={onNext}><ArrowRight className="size-4" /></Button>
        </div>
      </div>
    </section>
  );
}

function BirthdayBunting() {
  return (
    <div className="birthday-bunting mx-auto" role="img" aria-label="Banner cờ giấy ghi Happy Birthday">
      {["HAPPY", "BIRTHDAY"].map((word, rowIndex) => (
        <div key={word} className={cn("birthday-bunting-row", rowIndex === 0 ? "birthday-bunting-happy" : "birthday-bunting-birthday")} aria-hidden="true">
          <span className="birthday-bunting-wire" />
          <div className="birthday-bunting-flags">
            {word.split("").map((letter, index) => {
              const tilt = ((index % 3) - 1) * 1.5;
              const style = {
                "--flag-delay": `${rowIndex * 120 + index * 65}ms`,
                "--flag-tilt": `${tilt}deg`,
              } as CSSProperties;
              return <span key={`${letter}-${index}`} className="birthday-bunting-flag" style={style}>{letter}</span>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScrapbookSideDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="scrapbook-gift-stack">
        <Gift className="scrapbook-gift-main" />
        <Gift className="scrapbook-gift-small" />
        <Ribbon className="scrapbook-gift-ribbon" />
      </div>
      <div className="scrapbook-side-cake">
        <span className="scrapbook-cake-candle"><i /></span>
        <span className="scrapbook-cake-candle scrapbook-cake-candle-two"><i /></span>
        <div className="scrapbook-cake-tier scrapbook-cake-tier-top"><span className="scrapbook-cherry" /></div>
        <div className="scrapbook-cake-tier scrapbook-cake-tier-bottom"><span /><span /><span /></div>
      </div>
      <Flower2 className="scrapbook-side-flower" />
      <Sparkles className="scrapbook-side-sparkles" />
    </div>
  );
}

const scrapbookFrameClasses = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  strip: "aspect-[3/5]",
} as const;

function ScrapbookPolaroid({
  image,
  index,
}: {
  image: BirthdayExperienceConfig["images"][number];
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const style = { "--polaroid-rotation": `${image.rotation}deg` } as CSSProperties;

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const Observer = window.IntersectionObserver;

    if (typeof Observer !== "function") {
      const frameId = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new Observer(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={cn(
        "scrapbook-polaroid",
        `scrapbook-polaroid-${index + 1}`,
        revealed && "scrapbook-polaroid-revealed",
      )}
      style={style}
    >
      <span className="scrapbook-tape" aria-hidden="true" />
      <div className={cn("relative overflow-hidden rounded-sm bg-brand-soft/45", scrapbookFrameClasses[image.frame])}>
        {imageFailed ? (
          <div className="grid size-full place-items-center bg-gradient-to-br from-brand-soft to-[#eee3f7] text-brand" role="img" aria-label={`Không thể tải ${image.alt}`}>
            <ImageIcon className="size-8 opacity-60" aria-hidden="true" />
          </div>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index < 2}
            sizes="(max-width: 640px) calc(100vw - 4rem), (max-width: 1024px) 44vw, 360px"
            className="object-cover"
            style={{ objectPosition: image.objectPosition }}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <p className="scrapbook-caption">{image.caption}</p>
      {index % 3 === 1 ? <Heart className="scrapbook-card-sticker fill-current" aria-hidden="true" /> : null}
      {index % 4 === 2 ? <Ribbon className="scrapbook-card-ribbon" aria-hidden="true" /> : null}
    </article>
  );
}

const rainLayouts = [
  { x: "2%", duration: "12s", delay: "-7s", drift: "34px", rotation: "-7deg", size: "small" },
  { x: "14%", duration: "15s", delay: "-2s", drift: "-28px", rotation: "5deg", size: "medium" },
  { x: "28%", duration: "11s", delay: "-9s", drift: "42px", rotation: "-4deg", size: "large" },
  { x: "41%", duration: "16s", delay: "-5s", drift: "-38px", rotation: "8deg", size: "small" },
  { x: "55%", duration: "13s", delay: "-11s", drift: "26px", rotation: "-6deg", size: "medium" },
  { x: "69%", duration: "17s", delay: "-4s", drift: "-32px", rotation: "4deg", size: "large" },
  { x: "84%", duration: "12s", delay: "-8s", drift: "38px", rotation: "-8deg", size: "small" },
  { x: "92%", duration: "15s", delay: "-1s", drift: "-42px", rotation: "6deg", size: "medium" },
  { x: "8%", duration: "18s", delay: "-14s", drift: "28px", rotation: "5deg", size: "large" },
  { x: "34%", duration: "14s", delay: "-12s", drift: "-35px", rotation: "-5deg", size: "small" },
  { x: "63%", duration: "19s", delay: "-16s", drift: "40px", rotation: "7deg", size: "medium" },
  { x: "78%", duration: "13s", delay: "-6s", drift: "-26px", rotation: "-3deg", size: "large" },
] as const;

export function MemoryRainStep({
  config,
  onRestart,
}: {
  config: BirthdayExperienceConfig;
  onRestart: () => void;
}) {
  const [rainOffset, setRainOffset] = useState(0);
  const dragState = useRef({ active: false, startX: 0, startOffset: 0 });

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragState.current = { active: true, startX: event.clientX, startOffset: rainOffset };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveRain = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const nextOffset = dragState.current.startOffset + event.clientX - dragState.current.startX;
    setRainOffset(Math.max(-140, Math.min(140, nextOffset)));
  };
  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="relative min-h-svh overflow-hidden px-4 pb-8 pt-24 sm:px-8 sm:pt-28">
      <ul className="sr-only">
        {config.wishes.map((wish) => <li key={wish}>{wish}</li>)}
      </ul>
      <div
        className="memory-rain-viewport absolute inset-0 z-10 cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={startDragging}
        onPointerMove={moveRain}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        style={{ touchAction: "pan-y" }}
        aria-label="Vùng cơn mưa kỷ niệm có thể kéo sang hai bên"
      >
        <div className="memory-rain-track" style={{ transform: `translate3d(${rainOffset}px, 0, 0)` }} aria-hidden="true">
          {rainLayouts.map((layout, index) => {
            const image = config.images[Math.floor(index / 2) % config.images.length];
            const wish = config.wishes[Math.floor(index / 2) % config.wishes.length];
            const style = {
              "--rain-x": layout.x,
              "--rain-duration": layout.duration,
              "--rain-delay": layout.delay,
              "--rain-drift": layout.drift,
              "--rain-rotation": layout.rotation,
            } as CSSProperties;
            return (
              <div key={`${layout.x}-${index}`} className={cn("memory-rain-item", `memory-rain-${layout.size}`)} style={style}>
                {index % 2 === 0 ? (
                  <div className="memory-rain-photo">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={image.src} alt="" fill sizes="180px" className="object-cover" /></div>
                    <Heart className="absolute -right-2 -top-2 size-7 fill-brand-soft text-brand" />
                  </div>
                ) : (
                  <div className="memory-rain-wish"><Heart className="mb-2 size-4 fill-current text-brand" /><p>{wish}</p></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 flex flex-wrap justify-center gap-2 px-4 sm:bottom-7">
        <Button variant="outline" size="sm" className="border-white/70 bg-white/82 backdrop-blur-md" onClick={onRestart}>
          <RefreshCcw className="size-4" />
        </Button>
      </div>
    </section>
  );
}
