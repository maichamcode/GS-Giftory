import type { Metadata } from "next";
import { RecipientExperience } from "@/features/gifts/components/recipient-experience";

export const metadata: Metadata = {
  title: "Bạn có một món quà",
  description: "Một món quà riêng đang chờ bạn mở trên Giftory.",
};

export default async function GiftPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RecipientExperience slug={slug} />;
}
