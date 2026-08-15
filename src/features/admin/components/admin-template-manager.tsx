"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import type { GiftTemplate } from "@/types/gift";

export function AdminTemplateManager({ initialTemplates }: { initialTemplates: GiftTemplate[] }) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    return templates.filter((template) => !normalized || `${template.name} ${template.category}`.toLocaleLowerCase("vi").includes(normalized));
  }, [query, templates]);

  const toggleTemplate = (id: string) => {
    setTemplates((items) => items.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Thư viện</p><h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Quản lý mẫu quà.</h1></div><Link href="/templates" className={buttonStyles({ variant: "outline", size: "sm" })}>Xem thư viện <ExternalLink className="size-4" /></Link></div>
      <label className="relative mt-8 block max-w-sm"><span className="sr-only">Tìm mẫu quà</span><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" /><input className="field-control field-control-icon-start" type="search" placeholder="Tìm tên hoặc danh mục..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <div className="mt-6 grid gap-4">
        {visible.map((template) => (
          <article key={template.id} className="flex flex-col gap-4 rounded-card border border-line bg-background p-4 sm:flex-row sm:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:w-24 sm:shrink-0"><Image src={template.imageUrl} alt={`Mẫu ${template.name}`} fill sizes="96px" className="object-cover" /></div>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2"><Badge className="badge-neutral">{template.category}</Badge>{template.isFeatured ? <Badge className="badge-warning">Nổi bật</Badge> : null}</div><h2 className="mt-2 font-display text-xl font-semibold">{template.name}</h2><p className="mt-1 line-clamp-1 text-sm text-muted">{template.description}</p></div>
            <button type="button" role="switch" aria-checked={template.isActive} onClick={() => toggleTemplate(template.id)} className="flex items-center justify-between gap-3 rounded-full border border-line px-4 py-2 text-sm font-bold sm:justify-start"><span className={`h-3 w-3 rounded-full ${template.isActive ? "bg-forest" : "bg-muted/40"}`} />{template.isActive ? "Đang bật" : "Đã tắt"}</button>
          </article>
        ))}
      </div>
      {!visible.length ? <p className="mt-8 rounded-card border border-dashed border-line p-10 text-center text-muted">Không tìm thấy mẫu quà phù hợp.</p> : null}
    </div>
  );
}
