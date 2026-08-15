import Link from "next/link";
import { Gift } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

export default function ExperienceNotFound() {
  return (
    <main id="main-content" className="birthday-experience grid min-h-svh place-items-center px-5 text-center">
      <div className="max-w-lg">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/75 text-brand shadow-soft"><Gift className="size-7" /></span>
        <h1 className="mt-6 font-display text-4xl font-semibold">Chưa tìm thấy trải nghiệm này</h1>
        <p className="mt-3 leading-7 text-[var(--birthday-muted)]">Mẫu quà có thể đã thay đổi. Hãy chọn lại một mẫu đang có trong thư viện nhé.</p>
        <Link href="/templates" className={buttonStyles({ className: "mt-7" })}>Về thư viện mẫu</Link>
      </div>
    </main>
  );
}
