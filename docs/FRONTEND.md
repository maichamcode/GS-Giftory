# Frontend Architecture

## 1. Tổng quan

Đây là frontend cho nền tảng tạo và gửi quà tặng trực tuyến.

Frontend được xây dựng và hoàn thiện trước bằng mock data để kiểm tra giao diện, trải nghiệm người dùng và toàn bộ luồng nghiệp vụ. Backend và API thật sẽ được tích hợp sau mà không yêu cầu viết lại các component giao diện.

## 2. Phạm vi frontend

Frontend bao gồm:

- Trang chủ.
- Danh sách mẫu quà.
- Trình tạo quà.
- Xem trước quà.
- Lịch sử đơn hàng.
- Trang người nhận mở quà.
- Trang quản trị.

Chưa triển khai trong giai đoạn frontend:

- Database.
- Authentication thật.
- Thanh toán thật.
- Upload file lên cloud.
- Gửi email hoặc thông báo thật.
- API backend thật.

## 3. Công nghệ

- Next.js với App Router.
- TypeScript strict mode.
- Tailwind CSS.
- shadcn/ui.
- React Hook Form.
- Zod.
- pnpm.

Không thêm production dependency mới nếu chưa có lý do rõ ràng.

## 4. Cấu trúc thư mục

```text
src/
├── app/                 # Route, layout và page
├── components/
│   ├── ui/              # Component từ shadcn/ui
│   ├── layout/          # Header, footer, sidebar
│   └── shared/          # Component dùng chung
├── features/
│   ├── templates/
│   ├── gifts/
│   ├── experiences/
│   ├── orders/
│   └── admin/
├── mocks/               # Dữ liệu giả
├── services/            # Lớp truy cập dữ liệu
├── lib/                 # Utility và helper
├── config/              # Navigation và site config
└── types/               # Kiểu dữ liệu dùng chung
```

Code được tổ chức theo feature. Component chỉ sử dụng trong một feature phải được đặt bên trong feature đó.

## 5. Routes

| URL | Chức năng |
| --- | --- |
| `/` | Trang chủ |
| `/templates` | Danh sách mẫu quà |
| `/create` | Tạo quà mới |
| `/experience/[templateId]` | Xem trải nghiệm mẫu quà |
| `/preview/[draftId]` | Xem trước quà |
| `/orders` | Lịch sử đơn hàng |
| `/gift/[slug]` | Trang người nhận mở quà |
| `/admin` | Tổng quan quản trị |
| `/admin/templates` | Quản lý mẫu |
| `/admin/orders` | Quản lý đơn hàng |

## 6. Kiến trúc component

### UI components

Các component giao diện cơ bản:

- Button.
- Input.
- Textarea.
- Dialog.
- Card.
- Select.
- Tabs.
- Form controls.

Ưu tiên sử dụng hoặc mở rộng component từ shadcn/ui trước khi tạo component mới.

### Shared components

Các component được sử dụng ở nhiều feature:

- `AppHeader`.
- `AppFooter`.
- `PageHeader`.
- `EmptyState`.
- `ErrorState`.
- `LoadingState`.
- `ImageUploader`.
- `AudioPlayer`.

### Feature components

Các component gắn với nghiệp vụ:

- `TemplateCard`.
- `TemplateGallery`.
- `GiftBuilderForm`.
- `GiftPreview`.
- `BirthdayExperience`.
- `RecipientExperience`.
- `OrderCard`.
- `AdminOrderTable`.

Page component chỉ chịu trách nhiệm bố trí trang và kết nối các feature. Không đặt business logic lớn trực tiếp trong page.

## 7. Server và Client Components

Server Component là mặc định.

Chỉ thêm `"use client"` khi component cần:

- React state.
- Event handler.
- React Hook Form.
- Browser API.
- `localStorage`.
- Upload và preview file.
- Audio player.
- Tương tác kéo thả.

Không chuyển toàn bộ page thành Client Component nếu chỉ một phần nhỏ cần tương tác.

## 8. Quản lý dữ liệu

Trong giai đoạn frontend, dữ liệu được cung cấp bởi mock service.

Component không được import mock data trực tiếp và không gọi `fetch` trực tiếp. Component chỉ làm việc với service interface.

```text
Page hoặc Component
        ↓
Service interface
        ↓
Mock service hiện tại
        ↓
API service trong tương lai
```

Ví dụ:

```ts
export interface TemplateService {
  getTemplates(): Promise<GiftTemplate[]>;
  getTemplate(id: string): Promise<GiftTemplate | null>;
}
```

Khi backend hoàn thành, thay mock implementation bằng API implementation mà không sửa component UI.

## 9. Các model chính

```ts
export interface GiftTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  isActive: boolean;
}

export interface GiftDraft {
  id: string;
  templateId: string;
  senderName: string;
  recipientName: string;
  message: string;
  imageUrl?: string;
  audioUrl?: string;
}

export type OrderStatus = "draft" | "pending" | "paid" | "delivered";

export interface Order {
  id: string;
  giftId: string;
  status: OrderStatus;
  createdAt: string;
}
```

Model frontend chỉ chứa dữ liệu cần thiết cho giao diện. API contract chính thức được mô tả trong `docs/API_CONTRACT.md`.

## 10. Form và validation

Trình tạo quà sử dụng:

- React Hook Form để quản lý trạng thái form.
- Zod để khai báo schema và kiểm tra dữ liệu.
- Kiểu TypeScript được suy ra từ Zod schema.

Các field dự kiến:

- Tên người gửi.
- Tên người nhận.
- Lời chúc.
- Mẫu quà.
- Ảnh.
- Nhạc.

Validation cần kiểm tra:

- Field bắt buộc.
- Độ dài tên.
- Độ dài lời chúc.
- Loại file.
- Kích thước file.
- Định dạng ảnh và âm thanh.

Lỗi validation phải hiển thị gần field tương ứng. Không lưu hoặc gửi form khi dữ liệu không hợp lệ.

## 11. Luồng tạo quà

Trình tạo quà được chia thành các bước:

1. Chọn mẫu.
2. Nhập thông tin.
3. Thêm ảnh và nhạc.
4. Tùy chỉnh.
5. Xem trước.
6. Xác nhận.

Trong giai đoạn chưa có backend, bản nháp có thể được lưu thông qua một storage service sử dụng `localStorage`.

Component không được gọi `localStorage` trực tiếp.

Nội dung chỉnh sửa của trải nghiệm sinh nhật (tên người nhận, thư, chữ ký người viết, lời chúc, ảnh và nhạc) được đặt tại `src/features/experiences/birthday/birthday-experience-config.ts`. Tệp nhạc mẫu được trỏ tới `public/audio/until-you.mp3`; chỉ bật phát nhạc sau khi có tệp đã được cấp quyền sử dụng.

## 12. Thiết kế giao diện

Phong cách mong muốn:

- Ấm áp và giàu cảm xúc.
- Màu chủ đạo là hồng pastel, dùng sắc hồng đậm hơn cho CTA để bảo đảm độ tương phản.
- Hiện đại nhưng không quá kỹ thuật.
- Hình ảnh món quà là trọng tâm.
- Animation vừa phải.
- Nội dung dễ đọc.
- Call-to-action rõ ràng.
- Nút liên hệ hỗ trợ hiển thị cố định ở góc phải dưới và mở popover nhỏ ngay phía trên nút, không có lớp nền làm mờ. Mỗi lựa chọn Zalo, Facebook hoặc TikTok là liên kết mở trực tiếp trong tab mới.

Các design token cần thống nhất:

- Màu chính.
- Màu phụ.
- Màu nền.
- Font chữ.
- Border radius.
- Shadow.
- Spacing.
- Animation duration.

Không sử dụng màu tùy ý trong từng component nếu màu đó có thể khai báo thành theme token.

## 13. Responsive

Thiết kế theo hướng mobile-first.

Cần kiểm tra tối thiểu:

- Mobile: từ 320px.
- Tablet: từ 768px.
- Desktop: từ 1024px.
- Màn hình lớn: từ 1440px.

Trình tạo quà trên mobile hiển thị form trước và preview sau. Trên desktop có thể hiển thị form và preview song song.

Bảng admin phải có phương án phù hợp trên màn hình nhỏ, chẳng hạn card list hoặc horizontal scroll.

## 14. Accessibility

- Input phải có label.
- Button chỉ có icon phải có accessible name.
- Giao diện phải sử dụng được bằng bàn phím.
- Focus state phải nhìn thấy rõ.
- Màu chữ phải đủ độ tương phản.
- Ảnh có nội dung phải có alt text.
- Animation phải tôn trọng `prefers-reduced-motion`.
- Thông báo lỗi form phải dễ nhận biết.

## 15. Trạng thái giao diện

Mỗi trang hoặc feature truy cập dữ liệu cần xử lý:

- Loading.
- Empty.
- Error.
- Success.
- Disabled.
- Unauthorized nếu có.
- Not found.

Không chỉ thiết kế trường hợp dữ liệu tải thành công.

## 16. Quy tắc chất lượng

Trước khi hoàn thành một tính năng:

- Chạy `pnpm lint`.
- Chạy `pnpm typecheck`.
- Chạy `pnpm build`.
- Kiểm tra mobile và desktop.
- Kiểm tra browser console.
- Kiểm tra validation.
- Kiểm tra loading, empty và error state.
- Không sử dụng `any` nếu không có lý do rõ ràng.
- Không để component có quá nhiều trách nhiệm.

## 17. Chuẩn bị tích hợp backend

Khi backend được triển khai:

- Giữ nguyên component UI.
- Tạo API service tương ứng với mock service.
- Đưa API base URL vào biến môi trường.
- Chuyển đổi API response sang frontend model trong service.
- Xử lý authentication trong tầng service hoặc API client.
- Không để API response thô lan truyền trực tiếp vào component.
- Cập nhật `docs/API_CONTRACT.md` khi contract thay đổi.

## 18. Cập nhật tài liệu

Cập nhật file này khi thay đổi:

- Kiến trúc thư mục.
- Công nghệ chính.
- Quy tắc component.
- Chiến lược quản lý dữ liệu.
- Responsive behavior.
- Form architecture.
- Cách tích hợp backend.

Các quyết định kỹ thuật quan trọng và lý do đưa ra quyết định phải được ghi trong `docs/DECISIONS.md`.
