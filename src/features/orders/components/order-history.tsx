"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Gift, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EmptyState, ErrorState, LoadingCards } from "@/components/shared/states";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { cn, formatDate, orderStatusMeta } from "@/lib/utils";
import { orderService } from "@/services/order-service";
import type { Order, OrderStatus } from "@/types/gift";

const filters: Array<{ label: string; value: OrderStatus | "all" }> = [
  { label: "Tất cả", value: "all" },
  { label: "Bản nháp", value: "draft" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đã xác nhận", value: "paid" },
  { label: "Đã gửi", value: "delivered" },
];

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>();
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    orderService.getOrders().then(
      (items) => {
        if (!active) return;
        setOrders(items);
        setLoadError(false);
      },
      () => {
        if (!active) return;
        setLoadError(true);
      },
    );
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const visibleOrders = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    return (orders ?? []).filter((order) => {
      const matchesStatus = status === "all" || order.status === status;
      const matchesQuery =
        !normalized ||
        `${order.id} ${order.recipientName} ${order.templateName}`
          .toLocaleLowerCase("vi")
          .includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [orders, query, status]);

  if (!orders && !loadError) return <LoadingCards count={3} />;
  if (loadError) return <ErrorState onRetry={() => setRefreshKey((value) => value + 1)} />;

  return (
    <div>
      <div className="rounded-card border border-line bg-surface/90 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-80">
            <span className="sr-only">Tìm đơn quà</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              className="field-control field-control-icon-start"
              type="search"
              placeholder="Tên người nhận hoặc mã đơn..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Lọc trạng thái đơn quà">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={status === filter.value}
                onClick={() => setStatus(filter.value)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition",
                  status === filter.value
                    ? "border-foreground bg-foreground text-white"
                    : "border-line bg-background text-muted hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="my-6 text-sm text-muted" aria-live="polite">
        <strong className="text-foreground">{visibleOrders.length}</strong> đơn quà
      </p>

      {visibleOrders.length ? (
        <div className="grid gap-4">
          {visibleOrders.map((order) => {
            const meta = orderStatusMeta[order.status];
            return (
              <article key={order.id} className="rounded-card border border-line bg-surface p-4 shadow-[0_8px_26px_rgba(106,57,78,.05)] sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-soft sm:w-32 sm:shrink-0">
                    <Image src={order.thumbnailUrl} alt={`Món quà dành cho ${order.recipientName}`} fill sizes="(max-width: 640px) calc(100vw - 4rem), 128px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={meta.className}>{meta.label}</Badge>
                      <span className="text-xs font-bold text-muted">{order.id}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold">Dành cho {order.recipientName}</h2>
                    <p className="mt-1 text-sm text-muted">{order.templateName} · Tạo ngày {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {order.status === "draft" ? (
                      <Link href={`/create?draft=${order.draftId}`} className={buttonStyles({ variant: "outline", size: "sm" })}>Tiếp tục sửa</Link>
                    ) : (
                      <Link href={`/gift/${order.giftSlug}`} className={buttonStyles({ variant: "outline", size: "sm" })}>
                        Mở quà <ExternalLink className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Chưa có đơn quà phù hợp"
          description="Thử đổi bộ lọc, hoặc bắt đầu tạo một món quà mới cho người bạn đang nghĩ đến."
          action={<Link href="/create" className={buttonStyles()}><Gift className="size-4" /> Tạo món quà</Link>}
        />
      )}
    </div>
  );
}
