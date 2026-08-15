export type TemplateCategory =
  | "Sinh nhật"
  | "Tình yêu"
  | "Biết ơn"
  | "Kỷ niệm"
  | "Chúc mừng"
  | "Mùa lễ hội";

export type GiftPalette = "blush" | "sunset" | "sage" | "midnight";

export type GiftTypography = "serif" | "modern" | "handwritten";

export interface GiftTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: TemplateCategory;
  isActive: boolean;
  isFeatured: boolean;
  accent: string;
  mood: string;
}

export type DraftStatus = "editing" | "ready" | "published";

export interface GiftDraft {
  id: string;
  templateId: string;
  senderName: string;
  recipientName: string;
  message: string;
  imageUrl?: string;
  audioUrl?: string;
  audioName?: string;
  palette: GiftPalette;
  typography: GiftTypography;
  status: DraftStatus;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "draft" | "pending" | "paid" | "delivered";

export interface Order {
  id: string;
  giftId: string;
  draftId: string;
  templateId: string;
  templateName: string;
  recipientName: string;
  recipientEmail?: string;
  giftSlug: string;
  thumbnailUrl: string;
  status: OrderStatus;
  createdAt: string;
  deliveredAt?: string;
}

export interface RecipientGift {
  slug: string;
  senderName: string;
  recipientName: string;
  message: string;
  imageUrl: string;
  audioUrl?: string;
  audioName?: string;
  palette: GiftPalette;
  typography: GiftTypography;
  templateName: string;
}

export interface AdminMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "steady";
}
