import { giftTemplates } from "@/mocks/gift-data";
import type { GiftTemplate, TemplateCategory } from "@/types/gift";

export interface TemplateService {
  getTemplates(options?: { includeInactive?: boolean }): Promise<GiftTemplate[]>;
  getFeaturedTemplates(): Promise<GiftTemplate[]>;
  getTemplate(id: string): Promise<GiftTemplate | null>;
  getCategories(): Promise<TemplateCategory[]>;
}

class MockTemplateService implements TemplateService {
  async getTemplates(options?: { includeInactive?: boolean }) {
    const templates = options?.includeInactive
      ? giftTemplates
      : giftTemplates.filter((template) => template.isActive);
    return structuredClone(templates);
  }

  async getFeaturedTemplates() {
    return structuredClone(
      giftTemplates.filter((template) => template.isActive && template.isFeatured),
    );
  }

  async getTemplate(id: string) {
    const template = giftTemplates.find((item) => item.id === id);
    return template ? structuredClone(template) : null;
  }

  async getCategories() {
    return Array.from(
      new Set(
        giftTemplates
          .filter((template) => template.isActive)
          .map((template) => template.category),
      ),
    );
  }
}

export const templateService: TemplateService = new MockTemplateService();
