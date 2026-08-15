"use client";

import Link from "next/link";
import { ExternalLink, LoaderCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ErrorState } from "@/components/shared/states";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { formatDateTime, orderStatusMeta } from "@/lib/utils";
import { orderService } from "@/services/order-service";
import type { Order, OrderStatus } from "@/types/gift";

const statuses = Object.keys(orderStatusMeta) as OrderStatus[];

export function AdminOrderManager() {
  const [orders, setOrders] = useState<Order[]>();
  const [query, setQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string>();
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    orderService.getOrders().then((result) => { if (active) setOrders(result); }, () => { if (active) setLoadError(true); });
    return () => { active = false; };
  }, []);

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    return (orders ?? []).filter((order) => !normalized || `${order.id} ${order.recipientName} ${order.templateName}`.toLocaleLowerCase("vi").includes(normalized));
  }, [orders, query]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    const updated = await orderService.updateStatus(id, status);
    if (updated) setOrders((items) => items?.map((item) => item.id === id ? updated : item));
    setUpdatingId(undefined);
  };

  if (loadError) return <ErrorState />;

  return (
    <div>
      <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Vận hành</p><h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Quản lý đơn quà.</h1><p className="mt-3 text-sm leading-6 text-muted">Cập nhật trạng thái mô phỏng và mở nhanh trải nghiệm người nhận.</p></div>
      <label className="relative mt-8 block max-w-sm"><span className="sr-only">Tìm đơn hàng</span><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /><input className="field-control field-control-icon-start" type="search" placeholder="Mã đơn hoặc người nhận..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      {!orders ? <div className="skeleton mt-6 h-72 rounded-card" aria-busy="true" /> : (
        <div className="mt-6 overflow-hidden rounded-card border border-line bg-background">
          <div className="hidden grid-cols-[1.1fr_1fr_.8fr_1fr_auto] gap-4 border-b border-line bg-surface-soft px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-muted lg:grid"><span>Đơn quà</span><span>Người nhận</span><span>Ngày tạo</span><span>Trạng thái</span><span>Mở</span></div>
          <div className="divide-y divide-line">
            {visible.map((order) => (
              <article key={order.id} className="grid gap-4 p-5 lg:grid-cols-[1.1fr_1fr_.8fr_1fr_auto] lg:items-center">
                <div><p className="font-bold">{order.id}</p><p className="mt-1 text-xs text-muted">{order.templateName}</p></div>
                <p className="font-semibold">{order.recipientName}</p>
                <p className="text-sm text-muted">{formatDateTime(order.createdAt)}</p>
                <div className="flex items-center gap-2"><Badge className={orderStatusMeta[order.status].className}>{orderStatusMeta[order.status].label}</Badge>{updatingId === order.id ? <LoaderCircle className="size-4 animate-spin text-muted" /> : null}<label><span className="sr-only">Trạng thái đơn {order.id}</span><select className="rounded-lg border border-line bg-surface px-2 py-1 text-xs font-bold" value={order.status} disabled={updatingId === order.id} onChange={(event) => void updateStatus(order.id, event.target.value as OrderStatus)}>{statuses.map((status) => <option key={status} value={status}>{orderStatusMeta[status].label}</option>)}</select></label></div>
                <Link href={`/gift/${order.giftSlug}`} aria-label={`Mở món quà ${order.id}`} className={buttonStyles({ variant: "ghost", size: "icon" })}><ExternalLink className="size-4" /></Link>
              </article>
            ))}
          </div>
          {!visible.length ? <p className="p-10 text-center text-sm text-muted">Không tìm thấy đơn quà phù hợp.</p> : null}
        </div>
      )}
    </div>
  );
}
