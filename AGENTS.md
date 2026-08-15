# AGENTS.md

## Project overview

Đây là nền tảng tạo và gửi quà tặng trực tuyến.

Frontend được xây dựng trước để kiểm tra giao diện và luồng người dùng.
Backend sẽ được tích hợp sau.

Các chức năng chính:

- Trang chủ
- Danh sách mẫu quà
- Trình tạo quà
- Xem trước quà
- Lịch sử đơn hàng
- Trang người nhận mở quà
- Trang quản trị

## Required context

Trước khi bắt đầu một tính năng, hãy đọc các file liên quan:

- `docs/PRODUCT.md`
- `docs/FRONTEND.md`
- `docs/ROUTES.md`
- `docs/API_CONTRACT.md`

Nếu yêu cầu mới mâu thuẫn với tài liệu, hãy báo rõ trước khi thay đổi kiến trúc.

## Current phase

Dự án hiện ở giai đoạn Frontend-first.

- Không xây dựng database.
- Không xây dựng authentication thật.
- Không tạo API backend thật nếu chưa được yêu cầu.
- Dùng mock data để hoàn thiện giao diện và user flow.
- Mọi mock service phải có thể thay bằng API thật mà không sửa component UI.
- Không để component gọi trực tiếp `fetch`.
- Việc truy cập dữ liệu phải đi qua `src/services` hoặc repository của feature.

## Technology

- Next.js với App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- pnpm

Không thêm production dependency mới nếu chưa giải thích lý do.

## Architecture

Ưu tiên tổ chức code theo feature:

- `src/features/templates`
- `src/features/gifts`
- `src/features/orders`
- `src/features/admin`

Quy ước:

- Component dùng chung đặt trong `src/components`.
- Component của riêng một feature đặt trong feature tương ứng.
- Kiểu dữ liệu dùng chung đặt trong `src/types`.
- Zod schema đặt gần feature sử dụng nó.
- Mock data đặt trong `src/mocks`.
- Không đặt business logic lớn trong page component.
- Server Component là mặc định.
- Chỉ dùng `"use client"` khi cần state, form, browser API hoặc interaction.

## UI rules

- Thiết kế mobile-first.
- Giao diện phải responsive trên mobile, tablet và desktop.
- Ưu tiên component của shadcn/ui trước khi tạo component mới.
- Dùng Tailwind theme token, hạn chế giá trị màu tùy ý.
- Mỗi trang phải xem xét các trạng thái:
  - loading
  - empty
  - error
  - success
  - disabled
- Form phải có label, thông báo lỗi và hỗ trợ thao tác bằng bàn phím.
- Ảnh phải có kích thước ổn định để tránh layout shift.
- Không dùng emoji thay cho icon giao diện.

## Form rules

- Dùng React Hook Form để quản lý form.
- Dùng Zod làm nguồn validation chính.
- Kiểu dữ liệu form phải được suy ra từ Zod schema nếu có thể.
- Hiển thị lỗi validation gần field tương ứng.
- Không gửi hoặc lưu dữ liệu khi validation thất bại.

## Mock data rules

- Mock data phải có kiểu TypeScript rõ ràng.
- Component không được biết dữ liệu đến từ mock hay API.
- Các thao tác bất đồng bộ nên mô phỏng loading và failure.
- Nếu cần lưu bản nháp trên trình duyệt, đặt logic localStorage sau một service.
- Không truy cập localStorage trong Server Component.

## Code quality

- Không sử dụng `any` nếu không có lý do rõ ràng.
- Không để file component quá lớn; tách component khi có nhiều trách nhiệm.
- Tránh trùng lặp UI và business logic.
- Dùng tên biến và component thể hiện đúng nghiệp vụ.
- Chỉ comment để giải thích quyết định khó hiểu, không mô tả lại code.

## Verification

Sau khi thay đổi code, chạy:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Nếu không thể chạy một bước, phải nói rõ lý do.

Sau thay đổi giao diện quan trọng:

- Kiểm tra mobile và desktop.
- Kiểm tra console không có lỗi.
- Kiểm tra luồng chính bằng dữ liệu mock.
- Tóm tắt file đã thay đổi và phần chưa hoàn thành.

## Scope control

- Không tự ý triển khai backend trong giai đoạn frontend.
- Không tự ý đổi cấu trúc thư mục lớn.
- Không tự ý thay thư viện đã chọn.
- Không chỉnh sửa file không liên quan đến yêu cầu hiện tại.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
