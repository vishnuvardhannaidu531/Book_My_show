import { Film } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", message = "Try changing filters or refreshing." }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
      <Film className="mb-4 h-10 w-10 text-brand" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">{message}</p>
    </div>
  );
}
