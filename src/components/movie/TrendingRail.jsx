import { Link } from "react-router-dom";
import { getPosterUrl } from "../../utils/formatters";

export default function TrendingRail({ movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Trending now</h2>
        <span className="text-sm text-zinc-400">Curated from global movie state</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <Link
            key={movie.id || movie._id}
            to={`/movies/${movie.id || movie._id}`}
            className="min-w-64 overflow-hidden rounded-xl border border-white/10 bg-panel"
          >
            <div className="h-36">
              <img src={getPosterUrl(movie)} alt={movie.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-1 font-semibold text-white">{movie.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{movie.genre || "Drama"}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
