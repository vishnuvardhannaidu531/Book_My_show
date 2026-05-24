import { motion } from "framer-motion";
import { Info, PlayCircle, Star } from "lucide-react";
import NeonButton from "./NeonButton";

const MotionDiv = motion.div;

export default function HeroSection({
  title,
  description,
  backgroundImage,
  rating,
  onPlayClick,
  onInfoClick,
  badges = [],
}) {
  return (
    <section className="relative min-h-[calc(45vh-64px)] overflow-hidden">
      <MotionDiv
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-8 h-64 w-64 rounded-full bg-white/8 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[calc(45vh-64px)] max-w-7xl items-start px-4 py-5 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {badges.filter(Boolean).slice(0, 4).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-zinc-100 backdrop-blur-xl"
              >
                {badge}
              </span>
            ))}
            {rating && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-xl">
                <Star className="h-3.5 w-3.5 fill-current" />
                {rating}/10
              </span>
            )}
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <NeonButton onClick={onPlayClick} className="gap-2">
              <PlayCircle className="h-5 w-5" />
              Book tickets
            </NeonButton>
            {onInfoClick && (
              <NeonButton onClick={onInfoClick} variant="neon" className="gap-2">
                <Info className="h-5 w-5" />
                View details
              </NeonButton>
            )}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
