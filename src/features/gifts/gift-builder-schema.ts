import { z } from "zod";

export const giftBuilderSchema = z.object({
  templateId: z.string().min(1, "Hãy chọn một mẫu quà."),
  senderName: z
    .string()
    .trim()
    .min(2, "Tên người gửi cần ít nhất 2 ký tự.")
    .max(40, "Tên người gửi không quá 40 ký tự."),
  recipientName: z
    .string()
    .trim()
    .min(2, "Tên người nhận cần ít nhất 2 ký tự.")
    .max(40, "Tên người nhận không quá 40 ký tự."),
  message: z
    .string()
    .trim()
    .min(12, "Lời chúc cần ít nhất 12 ký tự để đủ trọn vẹn.")
    .max(500, "Lời chúc không quá 500 ký tự."),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  audioName: z.string().optional(),
  palette: z.enum(["blush", "sunset", "sage", "midnight"]),
  typography: z.enum(["serif", "modern", "handwritten"]),
});

export type GiftBuilderValues = z.infer<typeof giftBuilderSchema>;

export const stepFields = {
  1: ["templateId"],
  2: ["senderName", "recipientName", "message"],
  3: [],
  4: ["palette", "typography"],
  5: [],
  6: [],
} as const satisfies Record<number, ReadonlyArray<keyof GiftBuilderValues>>;
