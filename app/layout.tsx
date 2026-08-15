import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Giftory — Gửi một món quà, giữ lại một khoảnh khắc",
    template: "%s · Giftory",
  },
  description:
    "Tạo một món quà số mang theo ảnh, lời chúc và những cảm xúc chỉ riêng hai người hiểu.",
  applicationName: "Giftory",
  keywords: ["quà tặng số", "lời chúc", "quà sinh nhật", "Giftory"],
};

export const viewport: Viewport = {
  themeColor: "#fff8fb",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Bỏ qua đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
