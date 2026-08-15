import Link from "next/link";
import { AlertCircle, Gift, Inbox, RotateCcw } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";

export function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Đang tải nội dung" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-card border border-line bg-surface p-3">
          <div className="skeleton aspect-[4/3] rounded-[1.25rem]" />
          <div className="space-y-3 p-3 pt-5">
            <div className="skeleton h-4 w-1/4 rounded-full" />
            <div className="skeleton h-7 w-3/4 rounded-full" />
            <div className="skeleton h-4 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-panel border border-dashed border-line bg-surface/70 px-6 py-14 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-surface-soft text-muted">
        <Inbox className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "Có điều gì đó chưa ổn",
  description = "Giftory chưa thể tải nội dung này. Bạn hãy thử lại sau một chút nhé.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-panel border border-brand/20 bg-brand-soft/45 px-6 py-12 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-danger">
        <AlertCircle className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {onRetry ? (
        <Button className="mt-6" variant="outline" onClick={onRetry}>
          <RotateCcw className="size-4" aria-hidden="true" /> Thử lại
        </Button>
      ) : null}
    </div>
  );
}

export function NotFoundState({
  title = "Món quà này chưa có ở đây",
  description = "Có thể liên kết đã thay đổi hoặc món quà vẫn đang được hoàn thiện.",
  href = "/",
  actionLabel = "Về trang chủ",
}: {
  title?: string;
  description?: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-[1.4rem] bg-brand-soft text-brand">
        <Gift className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 leading-7 text-muted">{description}</p>
      <Link className={buttonStyles({ className: "mt-7" })} href={href}>
        {actionLabel}
      </Link>
    </div>
  );
}
