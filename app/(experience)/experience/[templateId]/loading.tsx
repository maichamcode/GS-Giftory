export default function ExperienceLoading() {
  return (
    <main id="main-content" className="birthday-experience grid min-h-svh place-items-center px-5 text-center" aria-busy="true">
      <div>
        <div className="skeleton mx-auto size-24 rounded-[2rem]" />
        <div className="skeleton mx-auto mt-6 h-9 w-64 max-w-full rounded-full" />
        <p className="mt-5 text-sm font-semibold text-[var(--birthday-muted)]">Đang chuẩn bị một bất ngờ...</p>
      </div>
    </main>
  );
}
