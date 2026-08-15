import type { Metadata } from "next";
import { GiftBuilder } from "@/features/gifts/components/gift-builder";
import { templateService } from "@/services/template-service";

export const metadata: Metadata = {
  title: "Tạo quà",
  description: "Tạo món quà số mang lời chúc, hình ảnh và giai điệu của riêng bạn.",
};

export default async function CreateGiftPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; draft?: string }>;
}) {
  const [params, templates] = await Promise.all([
    searchParams,
    templateService.getTemplates(),
  ]);

  return (
    <GiftBuilder
      templates={templates}
      initialTemplateId={params.template}
      initialDraftId={params.draft}
    />
  );
}
