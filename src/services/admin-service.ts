import { adminMetrics } from "@/mocks/gift-data";
import { orderService } from "@/services/order-service";
import { templateService } from "@/services/template-service";
import type { AdminMetric } from "@/types/gift";

export interface AdminService {
  getMetrics(): Promise<AdminMetric[]>;
  getDashboard(): Promise<{
    metrics: AdminMetric[];
    recentOrders: Awaited<ReturnType<typeof orderService.getOrders>>;
    activeTemplateCount: number;
  }>;
}

class MockAdminService implements AdminService {
  async getMetrics() {
    return structuredClone(adminMetrics);
  }

  async getDashboard() {
    const [recentOrders, templates] = await Promise.all([
      orderService.getOrders(),
      templateService.getTemplates(),
    ]);
    return {
      metrics: structuredClone(adminMetrics),
      recentOrders: recentOrders.slice(0, 5),
      activeTemplateCount: templates.length,
    };
  }
}

export const adminService: AdminService = new MockAdminService();
