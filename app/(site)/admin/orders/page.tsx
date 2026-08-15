import type { Metadata } from "next";
import { AdminOrderManager } from "@/features/admin/components/admin-order-manager";

export const metadata: Metadata = { title: "Quản lý đơn hàng" };

export default function AdminOrdersPage() {
  return <AdminOrderManager />;
}
