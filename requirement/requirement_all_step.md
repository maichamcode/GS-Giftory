# Birthday Website – Requirements

## Mục tiêu

Sửa phần Xem trải nghiệm mẫu theo những step-by-step này gồm 5 màn hình liên tiếp. Phong cách tổng thể:

- Cute, nữ tính và lãng mạn.
- Màu pastel hồng, kem và tím nhạt.
- Chuyển cảnh mượt mà.
- Tương thích tốt với điện thoại và máy tính.
- Không để nội dung hoặc hình ảnh làm vỡ giao diện.
- Nhạc nền là: Utill You
- Khi "Xem trải nghiệm mẫu" hoặc "Xem trước" thì sẽ sang 1 tab khác.
- Không cần button back và button chuyển step.

## Step 1 – Màn hình bắt đầu

- Background sinh nhật có bánh kem và các hộp quà + nến cần là ngọc lửa động.
- Có thể tự thiết kế background bằng CSS hoặc hình minh họa.
- Bánh sinh nhật là thành phần nổi bật ở giữa màn hình.
- Phía dưới bánh có một nút với nội dung: **“Nhấn để bắt đầu”**.
- Có hiệu ứng nhẹ như nến lung linh, ngôi sao hoặc trái tim bay.
- Khi nhấn nút:
  - Chuyển mượt sang Step 2.
  - Bắt đầu phát nhạc nền.
## Step 2 – Lời chúc sinh nhật

- Tiếp tục sử dụng background của Step 1.
- Nhạc nền tiếp tục phát và không bị phát lại khi chuyển màn hình.
- Hiển thị lần lượt ba dòng:

  1. **Chúc mừng sinh nhật**
  2. **Nguyễn Ngọc Hường**
  3. **Happy Birthday**

- Thiết kế chữ cute, nổi bật và có hiệu ứng xuất hiện mềm mại.
- Có một nút chuyển tiếp sang Step 3, thiết kế theo phong cách trái tim hoặc hộp quà.

## Step 3 – Bức thư

- Tiếp tục sử dụng background chung.
- Ban đầu hiển thị một phong thư chưa mở ở giữa màn hình.
- Có nút hình trái tim với nội dung **“Open”**.
- Khi nhấn Open:
  - Phong thư có hiệu ứng mở.
  - Nội dung thư xuất hiện với hiệu ứng đánh máy tự động.
  - Hiển thị con trỏ đánh máy trong lúc nội dung đang được viết.
- Nếu thư dài, vùng nội dung thư phải cuộn được.
- Không để toàn bộ trang hoặc layout bị kéo giãn bất thường.
- Sau khi nội dung được đánh máy xong, cuối thư hiển thị khối chữ ký căn phải gồm dòng **“Ký tên”** và tên người viết **“MaiĐX”**. Nội dung chữ ký phải đặt trong file cấu hình để có thể thay đổi mà không sửa layout.
- Cuối bức thư có nút **“Tiếp tục”** để sang Step 4.

### Nội dung thư

Sử dụng nội dung do người tạo cung cấp. Nếu chưa có nội dung chính thức, hãy đặt trong một biến cấu hình để có thể thay đổi dễ dàng.

# STEP 4 — Birthday Scrapbook Gallery

## 1. Mục tiêu

Thiết kế Step 4 thành một **album ảnh sinh nhật dạng scrapbook/Polaroid**, bám sát phong cách của hai ảnh tham chiếu đã cung cấp. Tổng thể cần cute, nữ tính, lãng mạn, tinh tế và có cảm giác được làm thủ công bằng giấy.

Step 4 phải có ba điểm nhận diện chính:

1. Banner **“HAPPY BIRTHDAY”** bằng hai dây cờ treo ở phía trên.
2. Các ảnh kỷ niệm đặt trong khung Polaroid, có băng dính màu hồng và lời chúc viết tay.
3. Background pastel màu trắng kem – hồng phấn, trang trí hộp quà bên trái và bánh sinh nhật bên phải.

> Không thiết kế tiêu đề dưới dạng hai dòng chữ thông thường. Chữ “HAPPY BIRTHDAY” bắt buộc phải được tạo thành banner cờ treo giống tinh thần của ảnh tham chiếu.

---

## 2. Background và phong cách mỹ thuật

- Tiếp tục sử dụng ngôn ngữ hình ảnh của background sinh nhật ở Step 1, nhưng điều chỉnh để gần với ảnh tham chiếu hơn.
- Nền chính là màu trắng kem hoặc hồng trắng rất nhạt, có texture giấy và các mảng màu nước hồng phấn loang nhẹ.
- Giữ độ tương phản thấp để ảnh và tiêu đề luôn là nội dung nổi bật nhất.
- Không dùng màu neon, màu quá đậm hoặc bóng đổ nặng.
- Phong cách nên giống một trang scrapbook sinh nhật được làm bằng giấy, bút màu và sticker.

### Chi tiết trang trí hai bên

- Góc trái hoặc cạnh trái có một hộp quà lớn màu hồng pastel, nơ vải mềm và một vài hộp quà nhỏ.
- Cạnh phải có bánh sinh nhật màu hồng nhiều tầng, kem chảy mềm, quả cherry và nến sáng nhẹ.
- Hộp quà và bánh được phép nằm một phần ngoài màn hình, tạo cảm giác bố cục tiếp tục vượt ra ngoài khung nhìn.
- Có thể bổ sung macaron, trái tim, ngôi sao hoặc hạt sáng nhỏ nhưng không được che ảnh.
- Các vật trang trí chỉ đóng vai trò tạo không khí; không làm phần giữa trở nên chật hoặc rối.

---

## 3. Thiết kế banner “HAPPY BIRTHDAY”

Banner nằm ở vùng trên của Step 4 và được căn giữa theo chiều ngang.

### Bố cục bắt buộc

- Dòng trên ghi **HAPPY**.
- Dòng dưới ghi **BIRTHDAY**.
- Hai dòng nằm trên hai sợi dây riêng, cong võng nhẹ tự nhiên.
- Dòng “BIRTHDAY” rộng hơn và nằm thấp hơn dòng “HAPPY”.
- Mỗi ký tự nằm trên **một lá cờ giấy riêng biệt**.
- Các lá cờ có thể nghiêng nhẹ khác nhau để tạo cảm giác thủ công, nhưng chữ vẫn phải dễ đọc.

### Hình dáng lá cờ

- Màu giấy trắng kem hoặc vàng kem rất nhạt.
- Viền vàng pastel mảnh, hơi thô như được vẽ bằng bút chì màu.
- Đáy lá cờ khoét chữ V hoặc có hai đuôi nhọn.
- Các lá cờ có kích thước gần bằng nhau và được nối vào dây bằng những nét nhỏ.
- Dây treo màu xanh da trời nhạt, nét mảnh và có texture vẽ tay.

### Kiểu chữ

- Chữ in hoa, dày, tròn và cute.
- Màu hồng dâu hoặc hồng đậm vừa phải.
- Nét chữ có texture bút sáp/bút chì màu, không quá hoàn hảo như font máy tính thông thường.
- Có thể sử dụng font chữ viết tay phù hợp kết hợp texture nhẹ, hoặc dựng từng chữ bằng SVG/CSS để đạt hiệu ứng gần ảnh tham chiếu.
- Không dùng font serif sang trọng, font quá mảnh, chữ phát sáng neon hoặc hiệu ứng 3D kim loại.

### Chuyển động

- Khi Step 4 xuất hiện, hai dây cờ có thể hạ xuống nhẹ rồi đung đưa rất chậm.
- Từng lá cờ xuất hiện lần lượt trong thời gian ngắn.
- Chuyển động phải mềm, biên độ nhỏ và không gây chóng mặt.
- Khi thiết bị bật chế độ giảm chuyển động, banner phải hiển thị tĩnh.

---

## 4. Bố cục album ảnh

- Album có cảm giác như nhiều tấm ảnh được dán ngẫu hứng lên một trang giấy lớn.
- Không xếp tất cả ảnh thành một grid cứng và đều nhau.
- Kết hợp nhiều kích thước khung: ngang, dọc, vuông và dải ảnh dài.
- Một số khung có thể chứa một ảnh; một số khung có thể chứa hai hoặc ba ảnh xếp dọc giống photo booth.
- Các khung có góc nghiêng rất nhẹ và vị trí so le để tạo nhịp điệu tự nhiên.
- Giữa các nhóm ảnh cần có khoảng trắng đủ rộng, giống hai ảnh tham chiếu.
- Trên màn hình đầu tiên của Step 4 có thể thấy phần đầu của 2–3 khung ảnh ở phía dưới banner, gợi ý cho người xem cuộn tiếp.
- Người dùng cuộn dọc để khám phá toàn bộ album.
- Album hỗ trợ hiển thị tối đa **10 ảnh**; có thể hiển thị ít hơn khi dữ liệu chưa đủ nhưng không được vượt quá giới hạn này.

### Khung Polaroid

- Khung màu trắng hoặc hồng trắng rất nhạt.
- Bề mặt khung có texture giấy hoặc họa tiết chấm/lưới cực nhỏ màu hồng nhạt.
- Mép dưới có thể rộng hơn để đặt lời chúc.
- Có bóng đổ hồng/xám rất nhẹ để tách khung khỏi background.
- Phía trên mỗi khung có một đoạn băng dính giấy bán trong suốt màu hồng pastel.
- Băng dính hơi lệch, có texture giấy và không quá bóng.
- Có thể thêm sticker trái tim hoặc nơ nhỏ ở một vài khung, nhưng không dùng trên tất cả các khung.

### Lời chúc trên ảnh

- Một số khung có lời chúc ngắn ở phần giấy bên dưới ảnh.
- Sử dụng font viết tay mềm mại, nữ tính và dễ đọc.
- Màu chữ là hồng dâu/hồng dusty rose.
- Ví dụ nội dung:
  - “Cạn ly vì một tuổi mới hạnh phúc!”
  - “Thắp sáng màn đêm bằng nụ cười!”
  - “Chúc cô gái của anh luôn rạng rỡ.”
  - “Mong mọi điều dịu dàng nhất sẽ đến với em.”
- Nội dung thật phải được lấy từ file cấu hình để người tạo có thể thay đổi mà không sửa layout.

---

## 5. Quy tắc hiển thị ảnh — bắt buộc

- Ảnh phải luôn nằm gọn bên trong vùng ảnh của khung Polaroid.
- Ảnh không được méo, kéo giãn hoặc tràn ra ngoài khung.
- Vùng chứa ảnh phải có `overflow: hidden` và tỉ lệ khung rõ ràng.
- Ảnh sử dụng `width: 100%`, `height: 100%` và `object-fit: cover`.
- Không được sử dụng `object-fit: fill`.
- Cho phép crop nhẹ phần rìa để ảnh phủ kín khung, nhưng phải ưu tiên giữ khuôn mặt và chủ thể chính.
- Mỗi ảnh nên có tùy chọn `objectPosition` riêng, ví dụ `center`, `center top` hoặc `50% 30%`, để căn khuôn mặt đúng vị trí.
- Ảnh ngang, ảnh dọc và ảnh vuông phải được đưa vào loại khung phù hợp với tỉ lệ ban đầu.
- Trong lúc ảnh chưa tải xong, hiển thị placeholder cùng tỉ lệ để layout không bị nhảy.
- Nếu ảnh tải lỗi, hiển thị một placeholder pastel thay vì biểu tượng ảnh hỏng của trình duyệt.

### Dữ liệu ảnh đề xuất

Mỗi mục ảnh nên có cấu trúc tương đương:

```js
{
  src: "/images/memory-01.jpg",
  alt: "Kỷ niệm sinh nhật của Hường",
  caption: "Chúc cô gái của anh luôn rạng rỡ.",
  frame: "landscape",
  objectPosition: "50% 35%",
  rotation: -2
}
```

Không hard-code danh sách ảnh trực tiếp trong component giao diện; đặt ảnh, lời chúc và cách căn ảnh trong file dữ liệu/cấu hình riêng.

---

## 6. Hiệu ứng xuất hiện và tương tác

- Mỗi khung ảnh ban đầu ở trạng thái mờ; khi người dùng cuộn đến đâu, ảnh tại vị trí đó mới xuất hiện và rõ dần bằng hiệu ứng fade-in kết hợp trượt lên nhẹ.
- Có thể xoay từ khoảng 1–3 độ về vị trí cuối để tạo cảm giác ảnh vừa được đặt lên trang giấy.
- Không dùng hiệu ứng bay quá nhanh, rung mạnh hoặc phóng to đột ngột.
- Có thể tạo parallax rất nhẹ cho hộp quà và bánh, nhưng không để ảnh bị giật khi cuộn.
- Khi chạm hoặc bấm vào một ảnh, có thể mở ảnh lớn trong lightbox. Đây là tính năng khuyến khích nhưng không bắt buộc.
- Cuối album có nút cute với nội dung **“Tiếp tục”** để chuyển sang Step 5.

---

## 7. Responsive

### Desktop

- Banner chiếm khoảng 45–60% chiều rộng màn hình và nằm ở trung tâm phía trên.
- Có thể hiển thị 2–3 khung ảnh trên cùng một hàng nhưng vị trí so le, không tạo cảm giác grid cứng.
- Hộp quà và bánh xuất hiện ở hai cạnh, được crop có chủ ý.

### Tablet

- Banner thu nhỏ nhưng vẫn giữ nguyên hai dòng và từng lá cờ riêng biệt.
- Album chuyển thành 2 cột linh hoạt.
- Giảm kích thước vật trang trí để không che ảnh.

### Mobile

- Giữ đúng thứ tự: `HAPPY` ở dòng trên và `BIRTHDAY` ở dòng dưới.
- Không để từng chữ tự xuống dòng ngoài ý muốn và không biến banner thành chữ thường.
- Banner rộng tối đa khoảng 92% màn hình.
- Album ưu tiên một cột, thỉnh thoảng có thể ghép hai khung nhỏ nếu vẫn dễ nhìn.
- Giảm góc xoay của khung để tránh tạo thanh cuộn ngang.
- Hộp quà và bánh chỉ xuất hiện một phần nhỏ ở hai cạnh hoặc chuyển thành họa tiết nền mờ.
- Toàn bộ trang không được có thanh cuộn ngang tại chiều rộng 320 px trở lên.

---

## 8. Yêu cầu về chất lượng

- Thiết kế phải giống **một trang scrapbook sinh nhật pastel cao cấp**, không giống gallery ảnh mặc định.
- Banner cờ treo “HAPPY BIRTHDAY” là thành phần nhận diện quan trọng nhất và phải được dựng đúng mô tả.
- Ảnh luôn sắc nét, giữ tỉ lệ, không méo và không phá vỡ bố cục.
- Các chi tiết trang trí không che khuôn mặt, lời chúc hoặc nút điều hướng.
- Không có thanh cuộn ngang, kể cả khi các khung ảnh được xoay.
- Tất cả ảnh phải có `alt` phù hợp.
- Hiệu ứng phải mượt trên điện thoại và tôn trọng `prefers-reduced-motion`.
- Step 4 phải hoạt động tốt tối thiểu tại các kích thước 375 × 667, 768 × 1024 và 1440 × 900.

---

## 9. Tiêu chí nghiệm thu

Step 4 chỉ được xem là hoàn thành khi đáp ứng đầy đủ các điều kiện sau:

- [ ] Có hai dây cờ cong nhẹ với nội dung “HAPPY” và “BIRTHDAY”.
- [ ] Mỗi chữ nằm trên một lá cờ riêng, không phải tiêu đề text thông thường.
- [ ] Màu sắc, texture và nét chữ mang cảm giác vẽ tay pastel giống ảnh tham chiếu.
- [ ] Có background trắng kem – hồng phấn, hộp quà bên trái và bánh kem bên phải.
- [ ] Có nhiều kiểu khung Polaroid, băng dính hồng và lời chúc viết tay.
- [ ] Album có bố cục so le, nhiều khoảng thở và cuộn dọc tự nhiên.
- [ ] Mọi ảnh đều giữ tỉ lệ, không méo, không tràn và không làm hỏng layout.
- [ ] Có cấu hình riêng cho ảnh, caption và `objectPosition`.
- [ ] Album hỗ trợ tối đa 10 ảnh và dữ liệu vượt giới hạn không được render thêm.
- [ ] Ảnh chỉ xuất hiện, rõ dần khi người dùng cuộn tới vị trí tương ứng.
- [ ] Giao diện responsive và không có thanh cuộn ngang.
- [ ] Có nút “Tiếp tục” ở cuối album để sang Step 5.

---

## 10. Chỉ dẫn ngắn cho AI triển khai

Hãy xây dựng lại Step 4 dựa trên đặc tả này và hai ảnh tham chiếu được đính kèm. Tái hiện đúng ngôn ngữ thị giác pastel scrapbook: banner cờ treo “HAPPY BIRTHDAY” hai tầng, nền màu nước trắng hồng, hộp quà và bánh kem ở hai cạnh, các khung Polaroid dán bằng băng dính hồng và lời chúc viết tay. Ưu tiên mobile-first, giữ ảnh đúng tỉ lệ bằng `object-fit: cover`, cho phép cấu hình vị trí chủ thể của từng ảnh, và tuyệt đối không để ảnh hoặc khung tạo tràn ngang hay phá vỡ layout.

## Step 5 – Cơn mưa kỷ niệm

- Hiển thị ảnh từ Step 4 xen kẽ với những lời chúc ngọt ngào của bạn trai.
- Ảnh và lời chúc rơi từ trên xuống giống hiệu ứng mưa.
- Các phần tử có:
  - Tốc độ rơi khác nhau.
  - Kích thước và góc nghiêng nhẹ khác nhau.
  - Hiệu ứng chiều sâu tự nhiên.
- Người xem có thể dùng chuột hoặc thao tác vuốt để di chuyển và tương tác.
- Người dùng có thể kéo hoặc vuốt qua các ảnh và lời chúc.
- Hiệu ứng phải mượt, không giật và không tạo thanh cuộn ngang.
- Trên điện thoại, số lượng phần tử cần được giới hạn để bảo đảm hiệu năng.

## Âm nhạc

- Nhạc bắt đầu sau khi người dùng nhấn nút ở Step 1.
- Nhạc tiếp tục xuyên suốt từ Step 2 đến Step 5.
- Nhạc được phát lặp lại nếu kết thúc.
- Có nút bật/tắt âm thanh nhỏ, không che nội dung.
- Đường dẫn nhạc cần được đặt trong file cấu hình để dễ thay đổi.

## Nội dung có thể chỉnh sửa

Tạo một file cấu hình riêng cho:

- Tên người nhận.
- Nội dung bức thư.
- Danh sách lời chúc.
- Danh sách hình ảnh.
- Đường dẫn nhạc nền.

## Yêu cầu kỹ thuật

- Ưu tiên giao diện mobile-first.
- Hoạt động tốt trên Chrome, Safari và trình duyệt điện thoại.
- Có hiệu ứng chuyển cảnh giữa các step.
- Tôn trọng tùy chọn giảm chuyển động của thiết bị.
- Tối ưu ảnh và hiệu ứng để trang tải nhanh.
- Không sử dụng nội dung mẫu khó thay thế.
- Nếu chưa có ảnh, nhạc hoặc nội dung thư, sử dụng placeholder và ghi rõ vị trí cần thay thế.
