"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  LoaderCircle,
  Save,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { EmptyState } from "@/components/shared/states";
import { Button, buttonStyles } from "@/components/ui/button";
import { BuilderProgress } from "@/features/gifts/components/builder-progress";
import {
  ConfirmStep,
  MediaStep,
  MessageStep,
  ReviewStep,
  StyleStep,
  TemplateStep,
} from "@/features/gifts/components/builder-steps";
import { GiftPreview } from "@/features/gifts/components/gift-preview";
import {
  giftBuilderSchema,
  stepFields,
  type GiftBuilderValues,
} from "@/features/gifts/gift-builder-schema";
import { cn } from "@/lib/utils";
import { draftStorageService } from "@/services/draft-storage-service";
import { mediaPreviewService } from "@/services/media-service";
import type { DraftStatus, GiftDraft, GiftTemplate } from "@/types/gift";

type SaveState = "idle" | "saving" | "saved" | "error";

export function GiftBuilder({
  templates,
  initialTemplateId,
  initialDraftId,
}: {
  templates: GiftTemplate[];
  initialTemplateId?: string;
  initialDraftId?: string;
}) {
  const router = useRouter();
  const reactId = useId();
  const generatedDraftId = `draft-${reactId.replace(/:/g, "")}`;
  const [currentStep, setCurrentStep] = useState(1);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loadingDraft, setLoadingDraft] = useState(Boolean(initialDraftId));
  const [draftNotFound, setDraftNotFound] = useState(false);
  const [imageError, setImageError] = useState<string>();
  const [audioError, setAudioError] = useState<string>();
  const draftId = initialDraftId || generatedDraftId;
  const draftMetaRef = useRef({ createdAt: new Date().toISOString(), slug: undefined as string | undefined });
  const autosaveReadyRef = useRef(!initialDraftId);

  const defaultTemplateId =
    templates.find((template) => template.id === initialTemplateId)?.id ?? templates[0]?.id ?? "";

  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<GiftBuilderValues>({
    resolver: zodResolver(giftBuilderSchema),
    mode: "onChange",
    defaultValues: {
      templateId: defaultTemplateId,
      senderName: "",
      recipientName: "",
      message: "",
      imageUrl: undefined,
      audioUrl: undefined,
      audioName: undefined,
      palette: "blush",
      typography: "serif",
    },
  });

  // All fields have form defaults, so the watched snapshot is complete at runtime.
  const values = useWatch({ control }) as GiftBuilderValues;
  const selectedTemplate =
    templates.find((template) => template.id === values.templateId) ?? templates[0];

  useEffect(() => {
    if (!initialDraftId) return;
    const draftId = initialDraftId;
    let active = true;

    async function loadDraft() {
      const draft = await draftStorageService.getDraft(draftId);
      if (!active) return;
      if (!draft) {
        setDraftNotFound(true);
        setLoadingDraft(false);
        return;
      }
      draftMetaRef.current = { createdAt: draft.createdAt, slug: draft.slug };
      reset({
        templateId: draft.templateId,
        senderName: draft.senderName,
        recipientName: draft.recipientName,
        message: draft.message,
        imageUrl: draft.imageUrl,
        audioUrl: draft.audioUrl,
        audioName: draft.audioName,
        palette: draft.palette,
        typography: draft.typography,
      });
      autosaveReadyRef.current = true;
      setLoadingDraft(false);
    }

    void loadDraft();
    return () => {
      active = false;
    };
  }, [initialDraftId, reset]);

  const saveCurrentDraft = useCallback(
    async (status: DraftStatus = "editing") => {
      if (!selectedTemplate) return false;
      setSaveState("saving");
      const currentValues = getValues();
      const draft: GiftDraft = {
        id: draftId,
        templateId: currentValues.templateId,
        senderName: currentValues.senderName,
        recipientName: currentValues.recipientName,
        message: currentValues.message,
        imageUrl: currentValues.imageUrl,
        audioUrl: currentValues.audioUrl,
        audioName: currentValues.audioName,
        palette: currentValues.palette,
        typography: currentValues.typography,
        status,
        slug: draftMetaRef.current.slug,
        createdAt: draftMetaRef.current.createdAt,
        updatedAt: new Date().toISOString(),
      };

      try {
        await draftStorageService.saveDraft(draft);
        reset(currentValues);
        setSaveState("saved");
        return true;
      } catch {
        setSaveState("error");
        return false;
      }
    },
    [draftId, getValues, reset, selectedTemplate],
  );

  useEffect(() => {
    if (!autosaveReadyRef.current || !isDirty || loadingDraft) return;
    const timer = window.setTimeout(() => {
      void saveCurrentDraft();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [isDirty, loadingDraft, saveCurrentDraft, values]);

  const goNext = async () => {
    const fields = [...stepFields[currentStep as keyof typeof stepFields]];
    const valid = fields.length ? await trigger(fields) : true;
    if (!valid) return;
    const saved = await saveCurrentDraft(currentStep >= 5 ? "ready" : "editing");
    if (!saved) return;
    setCurrentStep((step) => Math.min(step + 1, 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPreview = async () => {
    const valid = await trigger();
    if (!valid) {
      setCurrentStep(2);
      return;
    }
    const saved = await saveCurrentDraft("ready");
    if (saved) router.push(`/preview/${draftId}`);
  };

  const handleImageChange = async (file?: File) => {
    setImageError(undefined);
    if (!file) return;
    const validationError = mediaPreviewService.validateImage(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }
    try {
      const imageUrl = await mediaPreviewService.readAsDataUrl(file);
      setValue("imageUrl", imageUrl, { shouldDirty: true });
    } catch {
      setImageError("Giftory chưa thể đọc ảnh này. Hãy thử một ảnh khác.");
    }
  };

  const handleAudioChange = async (file?: File) => {
    setAudioError(undefined);
    if (!file) return;
    const validationError = mediaPreviewService.validateAudio(file);
    if (validationError) {
      setAudioError(validationError);
      return;
    }
    try {
      const audioUrl = await mediaPreviewService.readAsDataUrl(file);
      setValue("audioUrl", audioUrl, { shouldDirty: true });
      setValue("audioName", file.name, { shouldDirty: true });
    } catch {
      setAudioError("Giftory chưa thể đọc tệp này. Hãy thử một tệp khác.");
    }
  };

  if (loadingDraft) {
    return (
      <div className="container-shell py-16" aria-busy="true" aria-label="Đang mở bản nháp">
        <div className="skeleton h-9 w-64 rounded-xl" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="skeleton h-[34rem] rounded-panel" />
          <div className="skeleton h-[34rem] rounded-panel" />
        </div>
      </div>
    );
  }

  if (draftNotFound) {
    return (
      <div className="container-shell py-16">
        <EmptyState
          title="Không tìm thấy bản nháp"
          description="Bản nháp có thể đã bị xóa hoặc được tạo trên một thiết bị khác."
          action={<Link href="/create" className={buttonStyles()}>Tạo món quà mới</Link>}
        />
      </div>
    );
  }

  if (!selectedTemplate) return null;

  return (
    <div className="container-shell pb-24 pt-8 sm:pt-12">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Thư viện mẫu
          </Link>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Tạo món quà của bạn</h1>
        </div>
        <div className="flex items-center gap-3">
          <p className={cn("flex items-center gap-1.5 text-xs font-semibold", saveState === "error" ? "text-danger" : "text-muted")} aria-live="polite">
            {saveState === "saving" ? <><LoaderCircle className="size-3.5 animate-spin" /> Đang lưu...</> : null}
            {saveState === "saved" ? <><CheckCircle2 className="size-3.5 text-forest" /> Đã lưu trên thiết bị</> : null}
            {saveState === "error" ? <><TriangleAlert className="size-3.5" /> Chưa thể lưu</> : null}
            {saveState === "idle" ? "Bản nháp mới" : null}
          </p>
          <Button variant="outline" size="sm" onClick={() => void saveCurrentDraft()} disabled={saveState === "saving"}>
            <Save className="size-4" aria-hidden="true" /> Lưu
          </Button>
        </div>
      </div>

      <BuilderProgress currentStep={currentStep} />

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,.92fr)]">
        <section className="rounded-panel border border-line bg-surface/92 p-5 shadow-soft sm:p-8">
          {currentStep === 1 ? <TemplateStep templates={templates} selectedId={values.templateId} register={register} error={errors.templateId?.message} /> : null}
          {currentStep === 2 ? <MessageStep register={register} errors={errors} messageLength={values.message?.length ?? 0} /> : null}
          {currentStep === 3 ? (
            <MediaStep
              imageUrl={values.imageUrl}
              audioUrl={values.audioUrl}
              audioName={values.audioName}
              imageError={imageError}
              audioError={audioError}
              onImageChange={(file) => void handleImageChange(file)}
              onAudioChange={(file) => void handleAudioChange(file)}
              onRemoveImage={() => setValue("imageUrl", undefined, { shouldDirty: true })}
              onRemoveAudio={() => {
                setValue("audioUrl", undefined, { shouldDirty: true });
                setValue("audioName", undefined, { shouldDirty: true });
              }}
            />
          ) : null}
          {currentStep === 4 ? <StyleStep register={register} palette={values.palette} typography={values.typography} /> : null}
          {currentStep === 5 ? <ReviewStep values={values} template={selectedTemplate} /> : null}
          {currentStep === 6 ? <ConfirmStep values={values} template={selectedTemplate} /> : null}

          <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-5">
            <Button variant="ghost" onClick={goBack} disabled={currentStep === 1 || saveState === "saving"}>
              <ArrowLeft className="size-4" aria-hidden="true" /> Quay lại
            </Button>
            {currentStep < 6 ? (
              <Button onClick={() => void goNext()} disabled={saveState === "saving"}>
                {saveState === "saving" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {currentStep === 5 ? "Tiếp tục xác nhận" : "Tiếp tục"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={() => void openPreview()} disabled={saveState === "saving"}>
                <Eye className="size-4" aria-hidden="true" /> Mở bản xem trước
              </Button>
            )}
          </div>
        </section>

        <aside className="order-first lg:order-none lg:sticky lg:top-28" aria-label="Xem trước trực tiếp">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">Xem trước trực tiếp</p>
            <p className="text-xs font-semibold text-muted">{selectedTemplate.name}</p>
          </div>
          <GiftPreview
            senderName={values.senderName}
            recipientName={values.recipientName}
            message={values.message}
            imageUrl={values.imageUrl}
            fallbackImageUrl={selectedTemplate.imageUrl}
            audioUrl={values.audioUrl}
            audioName={values.audioName}
            palette={values.palette}
            typography={values.typography}
            compact
          />
        </aside>
      </div>
    </div>
  );
}
