import { sampleDrafts } from "@/mocks/gift-data";
import type { GiftDraft } from "@/types/gift";

const DRAFT_STORAGE_KEY = "giftory:drafts:v1";

function isGiftDraft(value: unknown): value is GiftDraft {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<GiftDraft>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.templateId === "string" &&
    typeof candidate.senderName === "string" &&
    typeof candidate.recipientName === "string" &&
    typeof candidate.message === "string"
  );
}

function readStoredDrafts() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isGiftDraft) : [];
  } catch {
    return [];
  }
}

function writeStoredDrafts(drafts: GiftDraft[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts));
}

export interface DraftStorageService {
  listDrafts(): Promise<GiftDraft[]>;
  getDraft(id: string): Promise<GiftDraft | null>;
  saveDraft(draft: GiftDraft): Promise<GiftDraft>;
  deleteDraft(id: string): Promise<void>;
}

class LocalDraftStorageService implements DraftStorageService {
  async listDrafts() {
    const storedDrafts = readStoredDrafts();
    const storedIds = new Set(storedDrafts.map((draft) => draft.id));
    return structuredClone([
      ...storedDrafts,
      ...sampleDrafts.filter((draft) => !storedIds.has(draft.id)),
    ]);
  }

  async getDraft(id: string) {
    const draft = readStoredDrafts().find((item) => item.id === id);
    if (draft) return structuredClone(draft);
    const sample = sampleDrafts.find((item) => item.id === id);
    return sample ? structuredClone(sample) : null;
  }

  async saveDraft(draft: GiftDraft) {
    const nextDraft = { ...draft, updatedAt: new Date().toISOString() };
    const drafts = readStoredDrafts();
    const currentIndex = drafts.findIndex((item) => item.id === nextDraft.id);

    if (currentIndex >= 0) drafts[currentIndex] = nextDraft;
    else drafts.unshift(nextDraft);

    writeStoredDrafts(drafts);
    return structuredClone(nextDraft);
  }

  async deleteDraft(id: string) {
    writeStoredDrafts(readStoredDrafts().filter((draft) => draft.id !== id));
  }
}

export const draftStorageService: DraftStorageService =
  new LocalDraftStorageService();
