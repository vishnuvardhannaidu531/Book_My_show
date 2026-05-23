import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const MotionButton = motion.button;

const variants = {
  primary: "bg-gradient-to-r from-brand to-brandSoft text-white shadow-glow hover:shadow-glow-lg",
  secondary: "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15",
  ghost: "text-zinc-200 hover:bg-white/10",
  danger: "bg-red-600 text-white hover:bg-red-500",
  neon: "bg-transparent border border-brand text-brand shadow-neon-glow hover:bg-brand/10",
};

export default function NeonButton({
  children,
  className = "",
  loading = false,
  variant = "primary",
  type = "button",
  glow = true,
  ...props
}) {
  return (
    <MotionButton
      type={type}
      disabled={loading || props.disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${glow && variant === "primary" ? "glow-animation" : ""} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </MotionButton>
  );
}
