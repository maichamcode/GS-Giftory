import { recipientGifts } from "@/mocks/gift-data";
import { draftStorageService } from "@/services/draft-storage-service";
import { templateService } from "@/services/template-service";
import type { RecipientGift } from "@/types/gift";

export interface RecipientService {
  getGift(slug: string): Promise<RecipientGift | null>;
}

class MockRecipientService implements RecipientService {
  async getGift(slug: string) {
    const mockGift = recipientGifts.find((gift) => gift.slug === slug);
    if (mockGift) return structuredClone(mockGift);

    const drafts = await draftStorageService.listDrafts();
    const draft = drafts.find((item) => item.slug === slug);
    if (!draft) return null;
    const template = await templateService.getTemplate(draft.templateId);
    if (!template) return null;

    return {
      slug,
      senderName: draft.senderName,
      recipientName: draft.recipientName,
      message: draft.message,
      imageUrl: draft.imageUrl || template.imageUrl,
      audioUrl: draft.audioUrl,
      audioName: draft.audioName,
      palette: draft.palette,
      typography: draft.typography,
      templateName: template.name,
    } satisfies RecipientGift;
  }
}

export const recipientService: RecipientService = new MockRecipientService();
