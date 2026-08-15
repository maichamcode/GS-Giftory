import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { OrderHistory } from "@/features/orders/components/order-history";

export const metadata: Metadata = {
  title: "Đơn quà",
  description: "Theo dõi những món quà bạn đã tạo và gửi bằng Giftory.",
};

export default function OrdersPage() {
  return (
    <div className="container-shell pb-24 pt-14 sm:pt-20">
      <PageHeader
        eyebrow="Những điều đã gửi"
        title="Mỗi món quà, một câu chuyện."
        description="Xem lại bản nháp, mở thử món quà và theo dõi hành trình của những lời chúc bạn đã trao."
      />
      <div className="mt-10 sm:mt-14"><OrderHistory /></div>
    </div>
  );
}
