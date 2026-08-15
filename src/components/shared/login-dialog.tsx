"use client";

import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { buttonStyles, Button } from "@/components/ui/button";

export function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Đăng nhập Giftory"
      description="Khu vực đăng nhập hiện đang ở chế độ giao diện mẫu trong giai đoạn frontend-first."
      className="sm:max-w-lg"
    >
      <div className="rounded-2xl border border-brand/15 bg-brand-soft/55 p-5">
        <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand shadow-soft">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold">Chưa cần tài khoản thật</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          Bạn vẫn có thể trải nghiệm toàn bộ luồng tạo quà và khu vực quản trị bằng dữ liệu mô phỏng.
        </p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button variant="outline" className="w-full" onClick={onClose}>Để sau</Button>
        <Link href="/admin" onClick={onClose} className={buttonStyles({ className: "w-full" })}>
          <ShieldCheck className="size-4" aria-hidden="true" /> Vào bản demo
        </Link>
      </div>
    </Dialog>
  );
}
