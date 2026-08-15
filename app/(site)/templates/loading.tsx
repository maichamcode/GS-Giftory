import { LoadingCards } from "@/components/shared/states";

export default function TemplatesLoading() {
  return (
    <div className="container-shell pb-24 pt-20">
      <div className="skeleton h-4 w-40 rounded-full" />
      <div className="skeleton mt-5 h-16 max-w-2xl rounded-2xl" />
      <div className="skeleton mt-4 h-5 max-w-xl rounded-full" />
      <div className="mt-14">
        <LoadingCards count={6} />
      </div>
    </div>
  );
}
