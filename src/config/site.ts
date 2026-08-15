export const siteConfig = {
  name: "Giftory",
  description:
    "Tạo một món quà số mang theo ảnh, lời chúc và những cảm xúc chỉ riêng hai người hiểu.",
  navigation: [
    { label: "Mẫu quà", href: "/templates" },
    { label: "Cách hoạt động", href: "/#how-it-works" },
    { label: "Đơn quà", href: "/orders" },
  ],
  adminNavigation: [
    { label: "Tổng quan", href: "/admin" },
    { label: "Mẫu quà", href: "/admin/templates" },
    { label: "Đơn hàng", href: "/admin/orders" },
  ],
} as const;
