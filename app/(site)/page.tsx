import { HomePage } from "@/features/home/components/home-page";
import { templateService } from "@/services/template-service";

export default async function Home() {
  const featuredTemplates = await templateService.getFeaturedTemplates();
  return <HomePage featuredTemplates={featuredTemplates} />;
}
