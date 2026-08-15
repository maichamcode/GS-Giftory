import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { SupportWidget } from "@/components/shared/support-widget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <AppFooter />
      <SupportWidget />
    </div>
  );
}
