import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      ) : null}
      <h1 className="display-title text-balance text-[clamp(2.75rem,7vw,5.5rem)]">{title}</h1>
      {description ? (
        <p className="mt-5 text-balance text-base leading-8 text-muted sm:text-lg">{description}</p>
      ) : null}
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  );
}
