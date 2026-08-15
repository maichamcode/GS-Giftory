import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BirthdayExperience } from "@/features/experiences/birthday/birthday-experience";
import { templateService } from "@/services/template-service";

export const metadata: Metadata = {
  title: "Gửi tặng em iu của MaiĐX",
  description: "I Love U",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  const templates = await templateService.getTemplates({ includeInactive: true });
  return templates.map((template) => ({ templateId: template.id }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = await templateService.getTemplate(templateId);
  if (!template) notFound();

  return <BirthdayExperience template={template} />;
}
