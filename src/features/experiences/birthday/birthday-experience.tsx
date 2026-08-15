"use client";

import { Music2, Volume2, VolumeX } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import {
  AlbumStep,
  GreetingStep,
  LetterStep,
  MemoryRainStep,
  StartStep,
} from "@/features/experiences/birthday/birthday-experience-steps";
import {
  createBirthdayExperienceConfig,
  type BirthdayExperienceConfig,
} from "@/features/experiences/birthday/birthday-experience-config";
import { cn } from "@/lib/utils";
import type { GiftTemplate } from "@/types/gift";

const TOTAL_STEPS = 5;

export function BirthdayExperience({ template }: { template: GiftTemplate }) {
  const config = createBirthdayExperienceConfig(template);
  const experienceRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [step, setStep] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicUnavailable, setMusicUnavailable] = useState(config.music.isPlaceholder);

  const playMusic = async () => {
    if (!audioRef.current || config.music.isPlaceholder) {
      setMusicUnavailable(true);
      return;
    }
    try {
      await audioRef.current.play();
      setMusicPlaying(true);
      setMusicUnavailable(false);
    } catch {
      setMusicUnavailable(true);
      setMusicPlaying(false);
    }
  };

  const startExperience = () => {
    setStep(2);
    void playMusic();
  };

  const toggleMusic = () => {
    if (!audioRef.current || musicUnavailable) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      void playMusic();
    }
  };

  const goNext = () => setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  const restart = () => setStep(1);

  useLayoutEffect(() => {
    experienceRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [step]);

  return (
    <main
      ref={experienceRef}
      id="main-content"
      className="birthday-experience relative h-svh overflow-x-hidden overflow-y-auto overscroll-y-contain"
    >
      <BirthdayBackdrop />
      <audio
        ref={audioRef}
        src={config.music.isPlaceholder ? undefined : config.music.url}
        loop
        preload="metadata"
        onError={() => {
          setMusicUnavailable(true);
          setMusicPlaying(false);
        }}
      />

      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-end gap-3 p-4 sm:p-6">
        <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/70 bg-white/76 px-3 py-2 shadow-soft backdrop-blur-md sm:top-7">
          {Array.from({ length: TOTAL_STEPS }, (_, index) => {
            const number = index + 1;
            return (
              <span
                key={number}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  number === step ? "w-6 bg-brand" : number < step ? "w-2 bg-brand/45" : "w-2 bg-foreground/15",
                )}
                aria-hidden="true"
              />
            );
          })}
          <span className="sr-only">Bước {step} trên {TOTAL_STEPS}</span>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          disabled={musicUnavailable}
          aria-pressed={musicPlaying}
          aria-label={musicUnavailable ? `Chưa có tệp nhạc ${config.music.title}` : musicPlaying ? "Tắt nhạc" : "Bật nhạc"}
          title={musicUnavailable ? `Thêm nhạc tại ${config.music.replacementPath}` : config.music.title}
          className="grid size-10 place-items-center rounded-full border border-white/70 bg-white/76 text-brand shadow-soft backdrop-blur-md transition hover:bg-white disabled:cursor-help disabled:opacity-65 sm:size-11"
        >
          {musicUnavailable ? <Music2 className="size-4" /> : musicPlaying ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
        </button>
      </div>

      {musicUnavailable ? (
        <p className="absolute right-4 top-16 z-30 max-w-48 rounded-xl bg-white/76 px-3 py-2 text-right text-[10px] font-semibold leading-4 text-muted shadow-soft backdrop-blur-md sm:right-6 sm:top-20">
          Nhạc “{config.music.title}” đang chờ tệp tại {config.music.replacementPath}
        </p>
      ) : null}

      <div
        key={step}
        className={cn(
          "relative z-10 min-h-svh",
          step !== 4 && "experience-step-enter",
        )}
      >
        {step === 1 ? <StartStep onStart={startExperience} /> : null}
        {step === 2 ? <GreetingStep config={config} onNext={goNext} /> : null}
        {step === 3 ? <LetterStep config={config} onNext={goNext} /> : null}
        {step === 4 ? <AlbumStep config={config} onNext={goNext} /> : null}
        {step === 5 ? <MemoryRainStep config={config} onRestart={restart} /> : null}
      </div>
    </main>
  );
}

function BirthdayBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="birthday-cloud birthday-cloud-one" />
      <span className="birthday-cloud birthday-cloud-two" />
      <span className="birthday-glow birthday-glow-one" />
      <span className="birthday-glow birthday-glow-two" />
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} className={`birthday-spark birthday-spark-${index + 1}`} />
      ))}
    </div>
  );
}

export type { BirthdayExperienceConfig };
