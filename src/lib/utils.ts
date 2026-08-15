import type { OrderStatus } from "@/types/gift";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  draft: { label: "Bản nháp", className: "badge-neutral" },
  pending: { label: "Chờ xác nhận", className: "badge-warning" },
  paid: { label: "Đã xác nhận", className: "badge-info" },
  delivered: { label: "Đã gửi", className: "badge-success" },
};

export function wait(duration = 280) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
