import Image from "next/image";
import {
  Check,
  FileAudio,
  ImagePlus,
  Info,
  Music2,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GiftPreview } from "@/features/gifts/components/gift-preview";
import type { GiftBuilderValues } from "@/features/gifts/gift-builder-schema";
import { cn } from "@/lib/utils";
import type { GiftTemplate } from "@/types/gift";

export function StepHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Bước {number}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

export function TemplateStep({
  templates,
  selectedId,
  register,
  error,
}: {
  templates: GiftTemplate[];
  selectedId: string;
  register: UseFormRegister<GiftBuilderValues>;
  error?: string;
}) {
  return (
    <div>
      <StepHeading number="1" title="Chọn cảm xúc mở đầu" description="Mẫu quà tạo nên không khí; mọi nội dung bên trong vẫn hoàn toàn là của bạn." />
      <fieldset>
        <legend className="sr-only">Chọn mẫu quà</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {templates.map((template) => {
            const selected = selectedId === template.id;
            return (
              <label
                key={template.id}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-surface p-2 transition",
                  selected ? "border-brand shadow-[0_0_0_3px_rgba(199,95,136,.12)]" : "border-transparent hover:border-line",
                )}
              >
                <input className="sr-only" type="radio" value={template.id} {...register("templateId")} />
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image src={template.imageUrl} alt="" fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover transition group-hover:scale-[1.03]" />
                  <span className={cn("absolute right-3 top-3 grid size-7 place-items-center rounded-full border-2", selected ? "border-white bg-brand text-white" : "border-white bg-white/85 text-transparent")}>
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="px-2 pb-1 pt-3">
                  <p className="font-display text-xl font-semibold">{template.name}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{template.category} · {template.mood}</p>
                </div>
              </label>
            );
          })}
        </div>
        {error ? <p className="mt-3 text-sm font-semibold text-danger" role="alert">{error}</p> : null}
      </fieldset>
    </div>
  );
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between gap-3 text-sm font-bold">
      <span>{children}</span>
      {optional ? <span className="text-xs font-medium text-muted">Không bắt buộc</span> : null}
    </label>
  );
}

export function MessageStep({ register, errors, messageLength }: { register: UseFormRegister<GiftBuilderValues>; errors: FieldErrors<GiftBuilderValues>; messageLength: number }) {
  return (
    <div>
      <StepHeading number="2" title="Viết điều bạn muốn nói" description="Gọi đúng tên, viết như cách bạn vẫn trò chuyện. Chân thành luôn là phong cách đẹp nhất." />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="senderName">Tên người gửi</FieldLabel>
          <input id="senderName" className="field-control" placeholder="Ví dụ: Nam" autoComplete="name" aria-invalid={Boolean(errors.senderName)} aria-describedby={errors.senderName ? "senderName-error" : undefined} {...register("senderName")} />
          {errors.senderName ? <p id="senderName-error" className="mt-2 text-sm font-semibold text-danger" role="alert">{errors.senderName.message}</p> : null}
        </div>
        <div>
          <FieldLabel htmlFor="recipientName">Tên người nhận</FieldLabel>
          <input id="recipientName" className="field-control" placeholder="Ví dụ: Minh Anh" autoComplete="off" aria-invalid={Boolean(errors.recipientName)} aria-describedby={errors.recipientName ? "recipientName-error" : undefined} {...register("recipientName")} />
          {errors.recipientName ? <p id="recipientName-error" className="mt-2 text-sm font-semibold text-danger" role="alert">{errors.recipientName.message}</p> : null}
        </div>
      </div>
      <div className="mt-5">
        <FieldLabel htmlFor="message">Lời chúc</FieldLabel>
        <textarea id="message" className="field-control min-h-44 resize-y" placeholder="Có những điều bình thường khi ở cạnh cậu lại trở nên thật đáng nhớ..." maxLength={500} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-help"} {...register("message")} />
        <div className="mt-2 flex items-start justify-between gap-4 text-xs">
          <p id={errors.message ? "message-error" : "message-help"} className={errors.message ? "font-semibold text-danger" : "text-muted"} role={errors.message ? "alert" : undefined}>
            {errors.message?.message || "Từ 12 đến 500 ký tự."}
          </p>
          <span className="shrink-0 text-muted">{messageLength}/500</span>
        </div>
      </div>
    </div>
  );
}

export function MediaStep({
  imageUrl,
  audioUrl,
  audioName,
  imageError,
  audioError,
  onImageChange,
  onAudioChange,
  onRemoveImage,
  onRemoveAudio,
}: {
  imageUrl?: string;
  audioUrl?: string;
  audioName?: string;
  imageError?: string;
  audioError?: string;
  onImageChange: (file?: File) => void;
  onAudioChange: (file?: File) => void;
  onRemoveImage: () => void;
  onRemoveAudio: () => void;
}) {
  return (
    <div>
      <StepHeading number="3" title="Thêm một khoảnh khắc" description="Ảnh và giai điệu là tùy chọn, nhưng đôi khi chỉ một chi tiết quen cũng đủ làm người nhận mỉm cười." />
      <div className="space-y-5">
        <div>
          <FieldLabel htmlFor="gift-image" optional>Ảnh kỷ niệm</FieldLabel>
          {imageUrl ? (
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-soft">
                <Image src={imageUrl} alt="Ảnh bạn vừa chọn" fill unoptimized={imageUrl.startsWith("data:")} sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">Ảnh đã sẵn sàng</p>
                <p className="mt-1 text-xs text-muted">Ảnh sẽ thay thế hình mặc định của mẫu.</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Xóa ảnh" onClick={onRemoveImage}><Trash2 className="size-4" /></Button>
            </div>
          ) : (
            <label htmlFor="gift-image" className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/75 px-6 text-center transition hover:border-brand/45 hover:bg-brand-soft/20">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><ImagePlus className="size-5" /></span>
              <span className="mt-3 text-sm font-bold">Chọn một bức ảnh</span>
              <span className="mt-1 text-xs text-muted">JPG, PNG hoặc WebP · tối đa 1,5 MB</span>
            </label>
          )}
          <input id="gift-image" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onImageChange(event.target.files?.[0])} />
          {imageError ? <p className="mt-2 text-sm font-semibold text-danger" role="alert">{imageError}</p> : null}
        </div>

        <div>
          <FieldLabel htmlFor="gift-audio" optional>Giai điệu hoặc lời nhắn thoại</FieldLabel>
          {audioUrl ? (
            <div className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-soft text-forest"><Music2 className="size-5" /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{audioName || "Tệp âm thanh"}</p><p className="mt-0.5 text-xs text-muted">Sẵn sàng để phát trong món quà</p></div>
                <Button variant="ghost" size="icon" aria-label="Xóa nhạc" onClick={onRemoveAudio}><Trash2 className="size-4" /></Button>
              </div>
              <audio className="mt-3 h-9 w-full" controls preload="metadata" src={audioUrl}>Trình duyệt không hỗ trợ phát âm thanh.</audio>
            </div>
          ) : (
            <label htmlFor="gift-audio" className="flex min-h-32 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-line bg-surface/75 px-5 transition hover:border-forest/45 hover:bg-forest-soft/20">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-soft text-forest"><FileAudio className="size-5" /></span>
              <span><span className="block text-sm font-bold">Chọn tệp âm thanh</span><span className="mt-1 block text-xs leading-5 text-muted">MP3, WAV, OGG hoặc M4A · tối đa 1,5 MB</span></span>
            </label>
          )}
          <input id="gift-audio" className="sr-only" type="file" accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4" onChange={(event) => onAudioChange(event.target.files?.[0])} />
          {audioError ? <p className="mt-2 text-sm font-semibold text-danger" role="alert">{audioError}</p> : null}
        </div>
      </div>
      <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface-soft px-4 py-3 text-xs leading-5 text-muted"><Info className="mt-0.5 size-4 shrink-0" /> Trong bản frontend, tệp chỉ được lưu trên thiết bị của bạn và không tải lên máy chủ.</p>
    </div>
  );
}

const palettes = [
  { value: "blush", label: "Hồng ấm", colors: ["#d78379", "#f2d4c8"] },
  { value: "sunset", label: "Nắng chiều", colors: ["#d46a42", "#efc487"] },
  { value: "sage", label: "Lá non", colors: ["#577967", "#c9d7be"] },
  { value: "midnight", label: "Đêm xanh", colors: ["#526986", "#c8b9ca"] },
] as const;

const typographyOptions = [
  { value: "serif", label: "Thơ mộng", sample: "Một điều để nhớ", className: "font-display" },
  { value: "modern", label: "Hiện đại", sample: "Một điều để nhớ", className: "font-sans" },
  { value: "handwritten", label: "Thân tình", sample: "Một điều để nhớ", className: "font-display italic" },
] as const;

export function StyleStep({ register, palette, typography }: { register: UseFormRegister<GiftBuilderValues>; palette: GiftBuilderValues["palette"]; typography: GiftBuilderValues["typography"] }) {
  return (
    <div>
      <StepHeading number="4" title="Chọn nét riêng" description="Màu sắc và kiểu chữ sẽ đi cùng cảm xúc trong lời chúc của bạn." />
      <fieldset>
        <legend className="text-sm font-bold">Bảng màu</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {palettes.map((item) => (
            <label key={item.value} className={cn("cursor-pointer rounded-2xl border-2 bg-surface p-3 transition", palette === item.value ? "border-brand" : "border-transparent hover:border-line")}>
              <input className="sr-only" type="radio" value={item.value} {...register("palette")} />
              <span className="flex h-12 overflow-hidden rounded-xl">{item.colors.map((color) => <span key={color} className="flex-1" style={{ backgroundColor: color }} />)}</span>
              <span className="mt-2 block text-center text-xs font-bold">{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-7">
        <legend className="text-sm font-bold">Kiểu chữ lời chúc</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {typographyOptions.map((item) => (
            <label key={item.value} className={cn("cursor-pointer rounded-2xl border-2 bg-surface p-4 text-center transition", typography === item.value ? "border-brand" : "border-transparent hover:border-line")}>
              <input className="sr-only" type="radio" value={item.value} {...register("typography")} />
              <span className={cn("block text-xl", item.className)}>{item.sample}</span>
              <span className="mt-2 block text-xs font-bold text-muted">{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function ReviewStep({ values, template }: { values: GiftBuilderValues; template: GiftTemplate }) {
  return (
    <div>
      <StepHeading number="5" title="Ngắm lại món quà" description="Đây là lúc đọc lại từng lời, nghe lại giai điệu và chắc rằng mọi thứ đã thật đúng ý." />
      <div className="lg:hidden">
        <GiftPreview senderName={values.senderName} recipientName={values.recipientName} message={values.message} imageUrl={values.imageUrl} fallbackImageUrl={template.imageUrl} audioUrl={values.audioUrl} audioName={values.audioName} palette={values.palette} typography={values.typography} compact />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-0">
        {[
          ["Mẫu quà", template.name],
          ["Người nhận", values.recipientName || "Chưa nhập"],
          ["Người gửi", values.senderName || "Chưa nhập"],
          ["Nội dung", `${values.message.length} ký tự`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-surface-soft p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p><p className="mt-2 font-bold">{value}</p></div>
        ))}
      </div>
    </div>
  );
}

export function ConfirmStep({ values, template }: { values: GiftBuilderValues; template: GiftTemplate }) {
  return (
    <div>
      <StepHeading number="6" title="Sẵn sàng tạo bất ngờ" description="Bản nháp đã được lưu trên thiết bị này. Hãy xem bản hoàn chỉnh trước khi gửi." />
      <div className="rounded-[1.5rem] border border-forest/15 bg-forest-soft/65 p-5 sm:p-6">
        <span className="grid size-12 place-items-center rounded-2xl bg-forest text-white"><Sparkles className="size-5" /></span>
        <h3 className="mt-5 font-display text-2xl font-semibold">Món quà cho {values.recipientName}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">Mẫu “{template.name}” · từ {values.senderName} · {values.imageUrl ? "có ảnh riêng" : "dùng ảnh mẫu"}{values.audioUrl ? " · có giai điệu" : ""}.</p>
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-white/70 p-3 text-xs leading-5 text-muted"><Check className="mt-0.5 size-4 shrink-0 text-forest" /> Bạn vẫn có thể quay lại chỉnh sửa sau khi xem trước.</div>
      </div>
    </div>
  );
}
