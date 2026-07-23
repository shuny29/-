export function DiagramViewer({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <img src={src} alt={title} className="mx-auto w-full max-w-md" />
    </div>
  );
}
