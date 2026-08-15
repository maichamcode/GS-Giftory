import type { GiftTemplate } from "@/types/gift";

export interface BirthdayExperienceImage {
  src: string;
  alt: string;
  caption: string;
  frame: "landscape" | "portrait" | "square" | "strip";
  objectPosition: string;
  rotation: number;
  isPlaceholder: boolean;
}

export interface BirthdayExperienceConfig {
  recipientName: string;
  letter: string;
  letterSignature: {
    label: string;
    name: string;
  };
  letterIsPlaceholder: boolean;
  wishes: string[];
  images: BirthdayExperienceImage[];
  music: {
    title: string;
    url: string;
    isPlaceholder: boolean;
    replacementPath: string;
  };
  templateName: string;
}

const MAX_BIRTHDAY_IMAGES = 10;

const editableBirthdayContent = {
  recipientName: "Nguyễn Ngọc Hường",
  letter:
    // "Thêm một tuổi mới là thêm một hành trình mới, và anh thật hạnh phúc khi được đồng hành cùng em trên chặng đường ấy. Đoạn đường em đi sau này có anh hay không có anh đi nữa, anh vẫn mong mọi thứ sẽ nhẹ nhàng với em hơn. Mong em luôn sáng suốt và bình an trên con đường mình đã chọn, bốn mùa Xuân, Hạ, Thu, Đông đều hạnh phúc."
    "Chúc mừng sinh nhật yêu dấu của anh ♡ Chúc em luôn hạnh phúc, bình an và luôn giữ nụ cười trên môi nhé. Cảm ơn vì mình gặp được nhau, cảm ơn vì mình chọn ở lại sau bao khó khăn. Anh mong mãi là người đồng hành, trưởng thành cùng em, mình cùng nhau đón nhiều sinh nhật nữa em nhé. Em luôn là ngoại lệ ngọt ngào mà anh mong giữ mãi ♡"
  ,
  letterSignature: {
    label: "Ký tên",
    name: "MaiĐX",
  },
  letterIsPlaceholder: true,
  wishes: [
    "Mong nụ cười của em luôn rạng rỡ như hôm nay.",
    "Tuổi mới thật nhiều bình yên và những điều ngọt ngào.",
    "Cảm ơn em vì đã làm thế giới của anh dịu dàng hơn.",
    "Mỗi ngày bên em đều là một kỷ niệm anh muốn giữ lại.",
    "Chúc cô gái đặc biệt nhất luôn được yêu thương thật nhiều.",
    "Happy Birthday, my favorite person.",
  ],
  images: [
    { src: "/images/girl/anh_quay_banh.jpg", alt: "Khoảnh khắc sinh nhật rực rỡ", caption: "Cạn ly vì một tuổi mới hạnh phúc!", frame: "landscape", objectPosition: "50% 45%", rotation: -2, isPlaceholder: true },
    { src: "/images/girl/anh_ngoi_xich_du.jpg", alt: "Hoa và bánh sinh nhật pastel", caption: "Thắp sáng màn đêm bằng nụ cười!", frame: "portrait", objectPosition: "50% 35%", rotation: 2, isPlaceholder: true },
    { src: "/images/girl/anh_ngoi_cau_thang.jpg", alt: "Lá thư cùng những đóa hồng", caption: "Chúc cô gái của anh luôn rạng rỡ.", frame: "square", objectPosition: "center", rotation: -1, isPlaceholder: true },
    { src: "/images/girl/anh_cam_hoa2.jpg", alt: "Món quà bất ngờ ấm áp", caption: "Mong mọi điều dịu dàng nhất sẽ đến với em.", frame: "strip", objectPosition: "50% 32%", rotation: 2, isPlaceholder: true },
    { src: "/images/girl/anh_chup_tuong.jpg", alt: "Kỷ niệm được gói bằng niềm vui", caption: "Mỗi ngày bên em đều thật đáng nhớ.", frame: "portrait", objectPosition: "center top", rotation: -2, isPlaceholder: true },
    { src: "/images/girl/anh_chup_o_nha.jpg", alt: "Một phút giây bình yên bên nhau", caption: "Tuổi mới luôn bình yên và được yêu thương.", frame: "landscape", objectPosition: "50% 40%", rotation: 1, isPlaceholder: true },
    { src: "/images/girl/anh_cam_may_anh.jpg", alt: "Kỷ niệm dịu dàng trong ngày sinh nhật", caption: "Happy Birthday, my favorite person.", frame: "square", objectPosition: "center", rotation: -1, isPlaceholder: true },
    { src: "/images/girl/anh_pizza.jpg", alt: "Hai người nâng ly bên bánh sinh nhật và hoa hồng", caption: "Cùng nâng ly cho những ngày thật rực rỡ phía trước.", frame: "landscape", objectPosition: "50% 52%", rotation: 2, isPlaceholder: true },
    { src: "/images/girl/anh_cam_hoa.jpg", alt: "Cô gái cầm bó hoa và món quà sinh nhật pastel", caption: "Mong em luôn được ôm trọn bởi hoa và những điều dịu dàng.", frame: "portrait", objectPosition: "50% 42%", rotation: -2, isPlaceholder: true },
    { src: "/images/girl/anh_ong_hut.jpg", alt: "Bàn quà sinh nhật với album ảnh và bánh macaron", caption: "Mình sẽ còn lấp đầy thật nhiều trang kỷ niệm cùng nhau.", frame: "square", objectPosition: "center", rotation: 1, isPlaceholder: true },
  ],
  music: {
    title: "Until You",
    url: "/audio/until-you.mp3",
    isPlaceholder: false,
    replacementPath: "public/audio/until-you.mp3",
  },
} satisfies Omit<BirthdayExperienceConfig, "templateName">;

export function createBirthdayExperienceConfig(template: GiftTemplate): BirthdayExperienceConfig {
  const templateImage: BirthdayExperienceImage = {
    src: template.imageUrl,
    alt: `Ảnh đại diện của mẫu ${template.name}`,
    caption: "Một khoảnh khắc nhỏ, một kỷ niệm thật lâu.",
    frame: "landscape",
    objectPosition: "center",
    rotation: -2,
    isPlaceholder: true,
  };
  const images = [
    templateImage,
    ...editableBirthdayContent.images.filter((image) => image.src !== template.imageUrl),
  ].slice(0, MAX_BIRTHDAY_IMAGES);

  return {
    ...editableBirthdayContent,
    images,
    templateName: template.name,
  };
}
