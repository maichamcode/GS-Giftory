import { orders as mockOrders } from "@/mocks/gift-data";
import { slugify } from "@/lib/utils";
import type { GiftDraft, Order, OrderStatus } from "@/types/gift";

const ORDER_STORAGE_KEY = "giftory:orders:v1";

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Order>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.draftId === "string" &&
    typeof candidate.status === "string"
  );
}

function readLocalOrders() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isOrder) : [];
  } catch {
    return [];
  }
}

function writeLocalOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
}

export interface OrderService {
  getOrders(): Promise<Order[]>;
  createOrder(draft: GiftDraft, templateName: string, thumbnailUrl: string): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}

class MockOrderService implements OrderService {
  async getOrders() {
    const localOrders = readLocalOrders();
    const localIds = new Set(localOrders.map((order) => order.id));
    return structuredClone([
      ...localOrders,
      ...mockOrders.filter((order) => !localIds.has(order.id)),
    ]);
  }

  async createOrder(draft: GiftDraft, templateName: string, thumbnailUrl: string) {
    const suffix = draft.id.slice(-5).toUpperCase();
    const slug = draft.slug ?? `${slugify(draft.recipientName)}-${suffix.toLowerCase()}`;
    const order: Order = {
      id: `GF-${new Date().getMonth() + 1}${new Date().getDate()}-${suffix}`,
      giftId: `gift-${draft.id}`,
      draftId: draft.id,
      templateId: draft.templateId,
      templateName,
      recipientName: draft.recipientName,
      giftSlug: slug,
      thumbnailUrl: draft.imageUrl || thumbnailUrl,
      status: "paid",
      createdAt: new Date().toISOString(),
    };
    const orders = readLocalOrders();
    const existingIndex = orders.findIndex((item) => item.draftId === draft.id);
    if (existingIndex >= 0) orders[existingIndex] = order;
    else orders.unshift(order);
    writeLocalOrders(orders);
    return structuredClone(order);
  }

  async updateStatus(id: string, status: OrderStatus) {
    const locals = readLocalOrders();
    const localIndex = locals.findIndex((item) => item.id === id);
    if (localIndex >= 0) {
      locals[localIndex] = { ...locals[localIndex], status };
      writeLocalOrders(locals);
      return structuredClone(locals[localIndex]);
    }

    const mock = mockOrders.find((item) => item.id === id);
    if (!mock) return null;
    const updated = { ...mock, status };
    writeLocalOrders([updated, ...locals]);
    return structuredClone(updated);
  }
}

export const orderService: OrderService = new MockOrderService();
