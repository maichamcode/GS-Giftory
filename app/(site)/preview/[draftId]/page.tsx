import type { Metadata } from "next";
import { DraftPreviewPage } from "@/features/gifts/components/draft-preview-page";

export const metadata: Metadata = {
  title: "Xem trước món quà",
};

export default async function PreviewPage({ params }: { params: Promise<{ draftId: string }> }) {
  const { draftId } = await params;
  return <DraftPreviewPage draftId={draftId} />;
}
