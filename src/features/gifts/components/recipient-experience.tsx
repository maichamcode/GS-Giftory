"use client";

import Link from "next/link";
import { Gift, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { NotFoundState } from "@/components/shared/states";
import { buttonStyles, Button } from "@/components/ui/button";
import { GiftPreview } from "@/features/gifts/components/gift-preview";
import { recipientService } from "@/services/recipient-service";
import type { RecipientGift } from "@/types/gift";

export function RecipientExperience({ slug }: { slug: string }) {
  const [gift, setGift] = useState<RecipientGift | null>();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let active = true;
    recipientService.getGift(slug).then((result) => {
      if (active) setGift(result);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (gift === undefined) {
    return (
      <div className="container-shell grid min-h-[70vh] place-items-center py-16" aria-busy="true" aria-label="Đang chuẩn bị món quà">
        <div className="text-center">
          <span className="mx-auto grid size-16 animate-float place-items-center rounded-2xl bg-brand-soft text-brand"><Gift className="size-7" /></span>
          <p className="mt-5 font-display text-2xl font-semibold">Đang chuẩn bị một bất ngờ...</p>
        </div>
      </div>
    );
  }

  if (!gift) return <NotFoundState />;

  if (!revealed) {
    return (
      <section className="container-shell grid min-h-[76vh] place-items-center py-16 text-center">
        <div className="relative max-w-xl rounded-panel border border-line bg-surface/90 px-6 py-14 shadow-lifted sm:px-12">
          <Sparkles className="absolute left-7 top-7 size-5 text-brand" aria-hidden="true" />
          <Heart className="absolute bottom-8 right-8 size-5 text-brand" aria-hidden="true" />
          <span className="mx-auto grid size-20 animate-float place-items-center rounded-[1.7rem] bg-brand text-white shadow-soft"><Gift className="size-9" /></span>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Có người đang nghĩ về bạn</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{gift.recipientName} ơi, bạn có một món quà.</h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-muted">Một lời nhắn từ {gift.senderName} đang chờ được mở. Hãy dành cho mình một khoảnh khắc thật chậm nhé.</p>
          <Button size="lg" className="mt-8" onClick={() => setRevealed(true)}>Mở món quà <Sparkles className="size-4" /></Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell pb-24 pt-10 text-center sm:pt-16">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Một món quà từ {gift.senderName}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Dành riêng cho {gift.recipientName}</h1>
      <div className="mx-auto mt-9 max-w-2xl animate-soft-rise text-left">
        <GiftPreview
          senderName={gift.senderName}
          recipientName={gift.recipientName}
          message={gift.message}
          imageUrl={gift.imageUrl}
          fallbackImageUrl={gift.imageUrl}
          audioUrl={gift.audioUrl}
          audioName={gift.audioName}
          palette={gift.palette}
          typography={gift.typography}
        />
      </div>
      <p className="mx-auto mt-9 max-w-md text-sm leading-6 text-muted">Món quà được tạo bằng Giftory — nơi những điều khó nói trở thành một khoảnh khắc đáng nhớ.</p>
      <Link href="/create" className={buttonStyles({ variant: "outline", className: "mt-5" })}>Tạo món quà của bạn</Link>
    </section>
  );
}
