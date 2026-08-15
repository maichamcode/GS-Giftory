export const mediaRules = {
  image: {
    accept: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 1.5 * 1024 * 1024,
  },
  audio: {
    accept: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"],
    maxSize: 1.5 * 1024 * 1024,
  },
} as const;

export interface MediaPreviewService {
  validateImage(file: File): string | null;
  validateAudio(file: File): string | null;
  readAsDataUrl(file: File): Promise<string>;
}

class BrowserMediaPreviewService implements MediaPreviewService {
  validateImage(file: File) {
    if (!mediaRules.image.accept.includes(file.type as (typeof mediaRules.image.accept)[number])) {
      return "Hãy chọn ảnh JPG, PNG hoặc WebP.";
    }
    if (file.size > mediaRules.image.maxSize) return "Ảnh cần nhỏ hơn 1,5 MB.";
    return null;
  }

  validateAudio(file: File) {
    if (!mediaRules.audio.accept.includes(file.type as (typeof mediaRules.audio.accept)[number])) {
      return "Hãy chọn tệp MP3, WAV, OGG hoặc M4A.";
    }
    if (file.size > mediaRules.audio.maxSize) return "Tệp nhạc cần nhỏ hơn 1,5 MB.";
    return null;
  }

  readAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Không thể đọc tệp này."));
      });
      reader.addEventListener("error", () => reject(new Error("Không thể đọc tệp này.")));
      reader.readAsDataURL(file);
    });
  }
}

export const mediaPreviewService: MediaPreviewService =
  new BrowserMediaPreviewService();
