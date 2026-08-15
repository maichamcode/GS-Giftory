import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { TemplateGallery } from "@/features/templates/components/template-gallery";
import { templateService } from "@/services/template-service";

export const metadata: Metadata = {
  title: "Mẫu quà",
  description: "Khám phá những mẫu quà số dành cho sinh nhật, kỷ niệm và mọi điều đáng nhớ.",
};

export default async function TemplatesPage() {
  const [templates, categories] = await Promise.all([
    templateService.getTemplates(),
    templateService.getCategories(),
  ]);

  return (
    <div className="container-shell pb-24 pt-14 sm:pt-20">
      <PageHeader
        eyebrow="Thư viện cảm xúc"
        title="Một mẫu quà cho mỗi câu chuyện."
        description="Chọn một không gian phù hợp, rồi biến nó thành món quà chỉ riêng bạn mới có thể gửi."
      />
      <div className="mt-10 sm:mt-14">
        <TemplateGallery templates={templates} categories={categories} />
      </div>
    </div>
  );
}
