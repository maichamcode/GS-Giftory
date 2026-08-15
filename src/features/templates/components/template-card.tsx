import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import type { GiftTemplate } from "@/types/gift";

export function TemplateCard({ template, priority = false }: { template: GiftTemplate; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-3 shadow-[0_8px_28px_rgba(106,57,78,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-surface-soft">
        <Image
          src={template.imageUrl}
          alt={`Mẫu quà ${template.name}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 45vw, 380px"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
        <Badge className="absolute left-3 top-3 bg-white/90 text-foreground backdrop-blur-sm">
          {template.category}
        </Badge>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/78 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          <Sparkles className="size-3.5" aria-hidden="true" /> {template.mood}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{template.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{template.description}</p>
        </div>
        <div className="mt-auto grid gap-2 pt-5 min-[400px]:grid-cols-2">
          <Link
            href={`/experience/${template.id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Xem trước mẫu ${template.name}`}
            className={buttonStyles({ variant: "outline", size: "sm", className: "w-full" })}
          >
            <Eye className="size-4" aria-hidden="true" />
            Xem trước
          </Link>
          <Link
            href={`/create?template=${template.id}`}
            aria-label={`Tạo quà với mẫu ${template.name}`}
            className={buttonStyles({ size: "sm", className: "w-full" })}
          >
            Tạo mẫu này
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
