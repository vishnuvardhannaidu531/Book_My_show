import { motion } from "framer-motion";
import { Clock, Languages, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getPosterUrl } from "../../utils/formatters";

const MotionArticle = motion.article;

export default function MovieCard({ movie }) {
  return (
    <MotionArticle
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-xl border border-white/10 bg-panel shadow-soft"
    >
      <Link to={`/movies/${movie.id || movie._id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden bg-white/5">
          <img
            src={getPosterUrl(movie)}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-white">{movie.title}</h3>
            <p className="mt-1 line-clamp-1 text-sm text-zinc-400">{movie.genre || "Drama"}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
              <Clock className="h-3 w-3" />
              {movie.durationMins || movie.duration || 120} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
              <Languages className="h-3 w-3" />
              {movie.language || "English"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-amber-100">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating || "New"}
            </span>
          </div>
        </div>
      </Link>
    </MotionArticle>
  );
}
