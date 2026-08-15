"use client";

import Link from "next/link";
import { BarChart3, Boxes, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const icons = [BarChart3, Boxes, ClipboardList];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="container-shell pb-24 pt-8 sm:pt-12">
      <div className="rounded-panel border border-line bg-surface/92 p-3 shadow-soft lg:grid lg:grid-cols-[14rem_1fr] lg:gap-8 lg:p-5">
        <aside className="border-b border-line pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
          <div className="px-3 py-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Không gian quản trị</p>
            <p className="mt-1 text-sm text-muted">Dữ liệu mô phỏng</p>
          </div>
          <nav className="mt-2 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Điều hướng quản trị">
            {siteConfig.adminNavigation.map((item, index) => {
              const Icon = icons[index];
              const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={cn("flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition", active ? "bg-foreground text-white" : "text-muted hover:bg-surface-soft hover:text-foreground")}>
                  <Icon className="size-4" aria-hidden="true" /> {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 px-1 py-6 sm:px-4 lg:py-3">{children}</div>
      </div>
    </div>
  );
}
