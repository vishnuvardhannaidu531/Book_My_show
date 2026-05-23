import { motion } from "framer-motion";
import { Clock, Languages, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { getPosterUrl } from "../../utils/formatters";

const MotionArticle = motion.article;

export default function PremiumMovieCard({ movie }) {
  const genres = String(movie.genre || "Drama")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean)
    .slice(0, 2);

  return (
    <MotionArticle
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-brand/60 hover:shadow-card-hover"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/15 to-transparent" />
      </div>

      <Link to={`/movies/${movie.id || movie._id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden bg-white/5 relative">
          <img
            src={getPosterUrl(movie)}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black via-black/20 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand shadow-glow"
            >
              <Play className="h-5 w-5 text-white fill-white" />
            </motion.div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1.5 border border-yellow-400/30">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">{movie.rating || "N/A"}</span>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-white group-hover:text-brand transition-colors">{movie.title}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <span key={genre} className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-zinc-300">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 backdrop-blur-sm">
              <Clock className="h-3.5 w-3.5" />
              {movie.durationMins || movie.duration || 120}m
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 backdrop-blur-sm">
              <Languages className="h-3.5 w-3.5" />
              {movie.language || "EN"}
            </span>
          </div>
        </div>
      </Link>
    </MotionArticle>
  );
}
