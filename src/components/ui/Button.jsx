import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-brand text-white shadow-glow hover:bg-brandSoft",
  secondary: "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15",
  ghost: "text-zinc-200 hover:bg-white/10",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export default function Button({
  children,
  className = "",
  loading = false,
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
