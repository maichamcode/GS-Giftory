"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  LoaderCircle,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NotFoundState } from "@/components/shared/states";
import { Button, buttonStyles } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { GiftPreview } from "@/features/gifts/components/gift-preview";
import { slugify } from "@/lib/utils";
import { draftStorageService } from "@/services/draft-storage-service";
import { orderService } from "@/services/order-service";
import { templateService } from "@/services/template-service";
import type { GiftDraft, GiftTemplate, Order } from "@/types/gift";

export function DraftPreviewPage({ draftId }: { draftId: string }) {
  const [draft, setDraft] = useState<GiftDraft | null>();
  const [template, setTemplate] = useState<GiftTemplate | null>();
  const [confirming, setConfirming] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order>();
  const [copied, setCopied] = useState(false);
  const [actionError, setActionError] = useState<string>();

  useEffect(() => {
    let active = true;

    void draftStorageService.getDraft(draftId).then(async (foundDraft) => {
      if (!active) return;
      if (!foundDraft) {
        setDraft(null);
        return;
      }

      const foundTemplate = await templateService.getTemplate(foundDraft.templateId);
      if (!active) return;
      setDraft(foundDraft);
      setTemplate(foundTemplate);
    });

    return () => {
      active = false;
    };
  }, [draftId]);

  const publishGift = async () => {
    if (!draft || !template) return;
    setConfirming(true);
    setActionError(undefined);
    const suffix = draft.id.replace(/[^a-z0-9]/gi, "").slice(-5).toLowerCase() || "gift";
    const slug = draft.slug || `${slugify(draft.recipientName)}-${suffix}`;
    const publishedDraft: GiftDraft = { ...draft, slug, status: "published", updatedAt: new Date().toISOString() };

    try {
      await draftStorageService.saveDraft(publishedDraft);
      const order = await orderService.createOrder(publishedDraft, template.name, template.imageUrl);
      setDraft(publishedDraft);
      setCreatedOrder(order);
    } catch {
      setActionError("Giftory chưa thể hoàn tất món quà. Bạn hãy thử lại nhé.");
    } finally {
      setConfirming(false);
    }
  };

  const copyGiftLink = async () => {
    if (!createdOrder) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/gift/${createdOrder.giftSlug}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setActionError("Không thể sao chép tự động. Bạn có thể chọn và sao chép đường dẫn bên dưới.");
    }
  };

  if (draft === undefined) {
    return (
      <div className="container-shell py-12" aria-label="Đang tải bản xem trước" aria-busy="true">
        <div className="skeleton h-10 w-64 rounded-xl" />
        <div className="skeleton mx-auto mt-10 aspect-[4/3] max-w-2xl rounded-panel" />
      </div>
    );
  }

  if (!draft || !template) {
    return (
      <NotFoundState
        title="Bản xem trước không còn ở đây"
        description="Bản nháp có thể đã bị xóa trên thiết bị này hoặc đường dẫn chưa chính xác."
        href="/create"
        actionLabel="Tạo món quà mới"
      />
    );
  }

  return (
    <div className="container-shell pb-24 pt-8 sm:pt-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Bản xem trước</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Món quà dành cho {draft.recipientName}</h1>
          <p className="mt-2 text-sm text-muted">Hãy đọc lại một lần như thể bạn là người nhận.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/create?draft=${draft.id}`} className={buttonStyles({ variant: "outline" })}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Chỉnh sửa
          </Link>
          <Button onClick={() => void publishGift()} disabled={confirming}>
            {confirming ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
            {confirming ? "Đang hoàn tất..." : "Hoàn tất món quà"}
          </Button>
        </div>
      </div>

      {actionError ? (
        <p className="mt-5 rounded-xl border border-danger/15 bg-brand-soft/55 px-4 py-3 text-sm font-semibold text-danger" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className="mx-auto mt-10 max-w-2xl">
        <GiftPreview
          senderName={draft.senderName}
          recipientName={draft.recipientName}
          message={draft.message}
          imageUrl={draft.imageUrl}
          fallbackImageUrl={template.imageUrl}
          audioUrl={draft.audioUrl}
          audioName={draft.audioName}
          palette={draft.palette}
          typography={draft.typography}
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl gap-3 rounded-2xl border border-line bg-surface/85 p-4 text-sm sm:grid-cols-3 sm:p-5">
        {[
          ["Mẫu", template.name],
          ["Người gửi", draft.senderName],
          ["Trạng thái", draft.status === "published" ? "Đã hoàn tất" : "Sẵn sàng"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-surface-soft p-3">
            <p className="text-xs font-bold text-muted">{label}</p>
            <p className="mt-1 font-bold">{value}</p>
          </div>
        ))}
      </div>

      <Dialog
        open={Boolean(createdOrder)}
        onClose={() => setCreatedOrder(undefined)}
        title="Món quà đã sẵn sàng"
        description={`Đường dẫn riêng dành cho ${draft.recipientName} đã được tạo trên thiết bị này.`}
      >
        <div className="rounded-2xl bg-forest-soft/65 p-5 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-forest text-white">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-bold">Một bất ngờ đã sẵn sàng để được mở.</p>
        </div>

        {createdOrder ? (
          <>
            <label htmlFor="gift-link" className="mt-5 block text-sm font-bold">Đường dẫn nhận quà</label>
            <div className="mt-2 flex gap-2">
              <input
                id="gift-link"
                className="field-control min-w-0 flex-1 text-sm"
                value={`/gift/${createdOrder.giftSlug}`}
                readOnly
                onFocus={(event) => event.currentTarget.select()}
              />
              <Button variant="outline" size="icon" aria-label="Sao chép đường dẫn" onClick={() => void copyGiftLink()}>
                {copied ? <Check className="size-4 text-forest" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link className={buttonStyles({ variant: "outline", className: "w-full" })} href="/orders">
                Xem đơn quà
              </Link>
              <Link className={buttonStyles({ className: "w-full" })} href={`/gift/${createdOrder.giftSlug}`}>
                Mở thử món quà <ExternalLink className="size-4" />
              </Link>
            </div>
          </>
        ) : null}
      </Dialog>
    </div>
  );
}
