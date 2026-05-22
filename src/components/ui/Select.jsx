export default function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-medium text-zinc-300">{label}</span>}
      <select
        className={`w-full rounded-lg border border-white/10 bg-panelSoft px-4 py-3 text-sm text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
