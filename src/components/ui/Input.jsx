export default function Input({ label, className = "", error, ...props }) {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-medium text-zinc-300">{label}</span>}
      <input
        className={`w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}
