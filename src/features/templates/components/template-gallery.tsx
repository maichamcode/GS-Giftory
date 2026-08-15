"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/features/templates/components/template-card";
import { cn } from "@/lib/utils";
import type { GiftTemplate, TemplateCategory } from "@/types/gift";

export function TemplateGallery({
  templates,
  categories,
}: {
  templates: GiftTemplate[];
  categories: TemplateCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory | "Tất cả">("Tất cả");

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return templates.filter((template) => {
      const matchesCategory = category === "Tất cả" || template.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${template.name} ${template.description} ${template.mood}`
          .toLocaleLowerCase("vi")
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, templates]);

  const clearFilters = () => {
    setQuery("");
    setCategory("Tất cả");
  };

  return (
    <div>
      <div className="rounded-card border border-line bg-surface/90 p-4 shadow-[0_8px_26px_rgba(106,57,78,.05)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-[22rem]">
            <span className="sr-only">Tìm mẫu quà</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              className="field-control field-control-icon-start field-control-action-end"
              type="search"
              placeholder="Tìm theo tên hoặc cảm xúc..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                type="button"
                className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface-soft hover:text-foreground"
                aria-label="Xóa từ khóa"
                onClick={() => setQuery("")}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1" aria-label="Lọc theo dịp">
            <SlidersHorizontal className="mr-1 size-4 shrink-0 text-muted" aria-hidden="true" />
            {(["Tất cả", ...categories] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition",
                  category === item
                    ? "border-foreground bg-foreground text-white"
                    : "border-line bg-background text-muted hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          <strong className="text-foreground">{filteredTemplates.length}</strong> mẫu dành cho bạn
        </p>
        {query || category !== "Tất cả" ? (
          <button type="button" className="text-sm font-bold text-brand hover:text-brand-hover" onClick={clearFilters}>
            Xóa bộ lọc
          </button>
        ) : null}
      </div>

      {filteredTemplates.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} priority={index < 3} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Chưa tìm thấy mẫu phù hợp"
          description="Thử một từ khóa khác hoặc xem lại tất cả mẫu quà đang có nhé."
          action={<Button onClick={clearFilters}>Xem tất cả mẫu</Button>}
        />
      )}
    </div>
  );
}
