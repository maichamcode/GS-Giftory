import Link from "next/link";
import {
  ArrowRight,
  Check,
  Heart,
  ImagePlus,
  MessageCircleHeart,
  Palette,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { GiftPreview } from "@/features/gifts/components/gift-preview";
import { TemplateCard } from "@/features/templates/components/template-card";
import type { GiftTemplate } from "@/types/gift";

const steps = [
  {
    icon: Palette,
    number: "01",
    title: "Chọn một cảm xúc",
    description: "Bắt đầu từ mẫu quà hợp với câu chuyện và dịp bạn muốn gửi.",
  },
  {
    icon: ImagePlus,
    number: "02",
    title: "Kể câu chuyện của bạn",
    description: "Thêm ảnh, lời chúc, giai điệu và vài nét riêng không ai khác có.",
  },
  {
    icon: Send,
    number: "03",
    title: "Gửi một bất ngờ",
    description: "Xem trước, hoàn thiện rồi chia sẻ món quà qua một đường dẫn riêng.",
  },
];

export function HomePage({ featuredTemplates }: { featuredTemplates: GiftTemplate[] }) {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -left-28 top-32 size-72 rounded-full bg-brand-soft/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-8 size-80 rounded-full bg-forest-soft/65 blur-3xl" />
        <div className="container-shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface/75 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-brand shadow-sm backdrop-blur-sm">
              <Sparkles className="size-3.5" aria-hidden="true" /> Quà tặng được kể bằng cảm xúc
            </div>
            <h1 className="display-title text-balance text-[clamp(3.5rem,8.5vw,7rem)]">
              Một món quà
              <span className="block text-brand">để nhớ thật lâu.</span>
            </h1>
            <p className="mt-7 max-w-xl text-balance text-lg leading-8 text-muted sm:text-xl">
              Gom ảnh, lời chúc và những điều chỉ riêng hai người hiểu thành một món quà số
              thật đẹp — mở ra ở bất cứ đâu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonStyles({ size: "lg", className: "group" })} href="/create">
                Tạo món quà đầu tiên
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                className={buttonStyles({ variant: "outline", size: "lg" })}
                href="/experience/tpl-sunshine"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="size-4 fill-current" aria-hidden="true" /> Xem trải nghiệm mẫu
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-forest" /> Không cần cài đặt</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-forest" /> Lưu bản nháp tự động</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mr-0">
            <div className="animate-float relative z-10 rotate-[1.5deg]">
              <GiftPreview
                senderName="Nam"
                recipientName="Minh Anh"
                message="Cảm ơn cậu vì đã biến những ngày bình thường thành những ký ức thật đẹp."
                fallbackImageUrl="/images/templates/rose-letter.jpg"
                palette="blush"
                typography="serif"
                compact
              />
            </div>
            <div className="absolute -left-3 top-12 z-20 -rotate-6 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-soft backdrop-blur-sm sm:-left-9">
              <p className="flex items-center gap-2 text-xs font-extrabold text-forest"><Heart className="size-4 fill-current" /> Làm bằng cả tấm lòng</p>
            </div>
            <div className="absolute -bottom-5 right-1 z-20 rotate-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-soft sm:right-2">
              <p className="flex items-center gap-2 text-xs font-extrabold"><MessageCircleHeart className="size-4 text-brand" /> 12.000+ lời chúc đã gửi</p>
            </div>
            <div className="absolute -right-8 -top-10 size-24 rounded-full border border-brand/20" />
            <div className="absolute -right-12 -top-14 size-32 rounded-full border border-brand/10" />
          </div>
        </div>
      </section>

      <section className="border-y border-line/75 bg-surface/65">
        <div className="container-shell grid grid-cols-2 gap-x-6 gap-y-7 py-8 sm:grid-cols-4">
          {[
            ["12K+", "món quà đã tạo"],
            ["4,9/5", "từ người gửi"],
            ["24", "mẫu cảm xúc"],
            ["3 phút", "để hoàn thiện"],
          ].map(([value, label]) => (
            <div key={label} className="text-center sm:text-left">
              <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
              <p className="mt-1 text-xs font-semibold text-muted sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Mẫu được yêu thích</p>
              <h2 className="mt-4 display-title text-balance text-4xl sm:text-5xl lg:text-6xl">Bắt đầu từ một cảm xúc.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">Mỗi mẫu là một không gian nhỏ để lời chúc của bạn được cất lên theo cách riêng.</p>
            </div>
            <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand hover:text-brand-hover">
              Xem tất cả mẫu <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-space border-y border-line bg-[#f2eadf]">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-forest">Chỉ ba bước nhỏ</p>
            <h2 className="mt-4 display-title text-balance text-4xl sm:text-5xl lg:text-6xl">Một bất ngờ rất riêng.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="relative rounded-card border border-line bg-surface p-7 shadow-[0_8px_25px_rgba(106,57,78,.05)]">
                <span className="absolute right-6 top-5 font-display text-4xl font-semibold text-surface-strong">{step.number}</span>
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-soft text-forest">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[26rem] rounded-panel bg-forest p-7 text-white shadow-lifted sm:p-10">
            <Quote className="size-10 fill-white/15 text-white/25" aria-hidden="true" />
            <blockquote className="mt-8 font-display text-3xl font-medium leading-tight sm:text-4xl">
              “Mẹ mình đã mở lại món quà ba lần trong tối đó. Có những điều viết ra mới biết là mình đã muốn nói từ lâu.”
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-[#eed0bf] font-extrabold text-forest">TH</span>
              <div>
                <p className="font-bold">Thanh Hà</p>
                <p className="text-sm text-white/65">Gửi quà sinh nhật cho mẹ</p>
              </div>
            </div>
            <div className="absolute bottom-7 right-7 flex gap-1 text-[#f4c85f]" aria-label="Đánh giá 5 trên 5 sao">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Những điều ở lại</p>
            <h2 className="mt-4 display-title text-balance text-4xl sm:text-5xl lg:text-6xl">Không chỉ là một đường link.</h2>
            <p className="mt-6 text-lg leading-8 text-muted">Giftory tạo nên một khoảnh khắc mở quà có nhịp điệu, hình ảnh và khoảng lặng — để người nhận thật sự cảm thấy được nghĩ đến.</p>
            <ul className="mt-8 space-y-4">
              {["Cá nhân hóa theo đúng câu chuyện của bạn", "Xem đẹp trên điện thoại, máy tính bảng và desktop", "Lưu bản nháp để quay lại bất cứ lúc nào"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold sm:text-base">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand"><Check className="size-3.5" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-shell">
          <div className="paper-noise relative overflow-hidden rounded-[2.25rem] bg-brand px-6 py-14 text-center text-white shadow-lifted sm:px-12 sm:py-20">
            <div className="absolute -left-10 -top-10 size-40 rounded-full border border-white/15" />
            <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-white/10" />
            <Sparkles className="mx-auto size-7 text-[#ffd987]" aria-hidden="true" />
            <h2 className="relative mt-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Có một người đang chờ<br className="hidden sm:block" /> món quà từ bạn.</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base leading-7 text-white/78">Bắt đầu bằng một mẫu bạn thích. Phần còn lại, hãy để câu chuyện của bạn dẫn đường.</p>
            <Link className={buttonStyles({ variant: "outline", size: "lg", className: "relative mt-8 border-white/50 bg-white text-brand hover:bg-white/90" })} href="/create">
              Tạo quà ngay <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
