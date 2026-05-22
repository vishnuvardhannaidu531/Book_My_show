import EmptyState from "../common/EmptyState";
import Skeleton from "../ui/Skeleton";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3]" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return <EmptyState title="No movies found" message="Search another title or clear the active filters." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id || movie._id} movie={movie} />
      ))}
    </div>
  );
}
