import type { Metadata } from "next";
import { AdminTemplateManager } from "@/features/admin/components/admin-template-manager";
import { templateService } from "@/services/template-service";

export const metadata: Metadata = { title: "Quản lý mẫu quà" };

export default async function AdminTemplatesPage() {
  const templates = await templateService.getTemplates({ includeInactive: true });
  return <AdminTemplateManager initialTemplates={templates} />;
}
