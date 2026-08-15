"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/layout/brand-mark";
import { LoginDialog } from "@/components/shared/login-dialog";
import { Button, buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/75 bg-background/88 backdrop-blur-xl">
      <div className="container-shell flex h-[4.75rem] items-center justify-between gap-5">
        <Link href="/" aria-label="Giftory — Trang chủ" className="shrink-0">
          <BrandMark />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {siteConfig.navigation.map((item) => {
            const isActive = item.href !== "/#how-it-works" && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-foreground",
                  isActive && "bg-surface-soft text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/admin" className={buttonStyles({ variant: "ghost", size: "sm" })}>
            Quản trị
          </Link>
          <Link href="/create" className={buttonStyles({ size: "sm" })}>
            Tạo quà ngay
          </Link>
          <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
            <UserRound className="size-4" aria-hidden="true" /> Đăng nhập
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-background px-4 pb-5 pt-3 lg:hidden">
          <nav aria-label="Điều hướng di động" className="container-shell flex flex-col gap-1">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold hover:bg-surface-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-base font-semibold hover:bg-surface-soft">
              Quản trị
            </Link>
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => {
                setMenuOpen(false);
                setLoginOpen(true);
              }}
            >
              <UserRound className="size-4" aria-hidden="true" /> Đăng nhập
            </Button>
            <Link href="/create" onClick={() => setMenuOpen(false)} className={buttonStyles({ className: "mt-3 w-full" })}>
              Tạo quà ngay
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
    <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
