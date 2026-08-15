import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";

export function AppFooter() {
  return (
    <footer className="border-t border-line bg-[#f5eee6]">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-16">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Mỗi món quà là một câu chuyện. Giftory giúp bạn kể câu chuyện ấy theo cách riêng,
            đủ gần gũi và đủ đáng nhớ.
          </p>
        </div>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-foreground">Khám phá</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link className="w-fit hover:text-brand" href="/templates">Mẫu quà</Link>
            <Link className="w-fit hover:text-brand" href="/create">Tạo quà mới</Link>
            <Link className="w-fit hover:text-brand" href="/orders">Đơn quà của bạn</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-foreground">Giftory</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link className="inline-flex w-fit items-center gap-1 hover:text-brand" href="/admin">
              Khu vực quản trị <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <span>hello@giftory.vn</span>
            <span>TP. Hồ Chí Minh, Việt Nam</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line/80">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Giftory. Một bản mẫu frontend đầy đủ.</span>
          <span className="inline-flex items-center gap-1.5">
            Được làm với <Heart className="size-3.5 fill-brand text-brand" aria-label="sự tận tâm" /> cho những điều đáng nhớ.
          </span>
        </div>
      </div>
    </footer>
  );
}
