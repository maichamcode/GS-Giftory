"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { formatDate, orderStatusMeta } from "@/lib/utils";
import { adminService } from "@/services/admin-service";
import type { AdminMetric, Order } from "@/types/gift";

type Dashboard = { metrics: AdminMetric[]; recentOrders: Order[]; activeTemplateCount: number };

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState<Dashboard>();

  useEffect(() => {
    let active = true;
    adminService.getDashboard().then((result) => {
      if (active) setDashboard(result);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!dashboard) {
    return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">{Array.from({ length: 4 }, (_, index) => <div key={index} className="skeleton h-32 rounded-card" />)}</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Tổng quan</p><h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Hôm nay tại Giftory.</h1></div>
        <p className="max-w-sm text-sm leading-6 text-muted">Một lát cắt nhanh về đơn quà và các mẫu đang hoạt động.</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.metrics.map((metric, index) => (
          <article key={metric.label} className="rounded-card border border-line bg-background p-5">
            <p className="text-sm font-bold text-muted">{metric.label}</p>
            <p className="mt-3 font-display text-3xl font-semibold">{index === 3 ? dashboard.activeTemplateCount : metric.value}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-forest"><TrendingUp className="size-3.5" /> {metric.change}</p>
          </article>
        ))}
      </div>
      <section className="mt-8 rounded-card border border-line bg-background p-5">
        <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">Cập nhật gần đây</p><h2 className="mt-1 font-display text-2xl font-semibold">Đơn quà mới</h2></div><Link href="/admin/orders" className={buttonStyles({ variant: "ghost", size: "sm" })}>Xem tất cả <ArrowRight className="size-4" /></Link></div>
        <div className="mt-5 divide-y divide-line">
          {dashboard.recentOrders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1"><p className="truncate font-bold">{order.recipientName} · {order.templateName}</p><p className="mt-1 text-xs text-muted">{order.id} · {formatDate(order.createdAt)}</p></div>
              <Badge className={orderStatusMeta[order.status].className}>{orderStatusMeta[order.status].label}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
