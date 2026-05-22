import { ArrowLeft, CalendarDays, Clock, Languages } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import ShowCard from "../components/booking/ShowCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import { fetchMovieById } from "../features/movies/movieSlice";
import { selectMovieDetailsLoading, selectMoviesError, selectSelectedMovie } from "../features/movies/movieSelectors";
import { fetchShowsByCity, fetchShowsByMovie, setShowCity } from "../features/shows/showSlice";
import { selectShowCity, selectShows, selectShowsError, selectShowsLoading } from "../features/shows/showSelectors";
import { getPosterUrl } from "../utils/formatters";

export default function MovieDetails() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(selectSelectedMovie);
  const movieLoading = useSelector(selectMovieDetailsLoading);
  const movieError = useSelector(selectMoviesError);
  const shows = useSelector(selectShows);
  const showsLoading = useSelector(selectShowsLoading);
  const showsError = useSelector(selectShowsError);
  const city = useSelector(selectShowCity);

  useEffect(() => {
    dispatch(fetchMovieById(movieId));
    dispatch(fetchShowsByMovie(movieId));
  }, [dispatch, movieId]);

  const handleCityFilter = () => {
    if (city.trim()) dispatch(fetchShowsByCity({ movieId, city: city.trim() }));
    else dispatch(fetchShowsByMovie(movieId));
  };

  if (movieLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Skeleton className="aspect-[2/3]" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button variant="secondary" onClick={() => history.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      {movieError && <ErrorState message={movieError} onRetry={() => dispatch(fetchMovieById(movieId))} />}

      {movie && (
        <section className="grid gap-6 rounded-2xl border border-white/10 bg-panel p-5 shadow-soft lg:grid-cols-[300px_1fr]">
          <img src={getPosterUrl(movie)} alt={movie.title} className="aspect-[2/3] w-full rounded-xl object-cover" />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-black text-white">{movie.title}</h1>
            <p className="mt-4 max-w-3xl text-zinc-300">{movie.description || "An exciting theatre experience awaits you."}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Clock className="h-4 w-4 text-brand" />{movie.durationMins || 120} min</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Languages className="h-4 w-4 text-brand" />{movie.language || "English"}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><CalendarDays className="h-4 w-4 text-brand" />{movie.genre || "Drama"}</span>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black text-white">Available shows</h2>
            <p className="text-sm text-zinc-400">Show data lives in the shows slice and is shared across booking flow.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[220px_auto]">
            <Input placeholder="Filter by city" value={city} onChange={(event) => dispatch(setShowCity(event.target.value))} />
            <Button onClick={handleCityFilter} loading={showsLoading}>Filter</Button>
          </div>
        </div>
        {showsError && <ErrorState message={showsError} onRetry={() => dispatch(fetchShowsByMovie(movieId))} />}
        {showsLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-32" />)}</div>
        ) : shows.length ? (
          <div className="space-y-4">{shows.map((show) => <ShowCard key={show.id || show._id} show={show} />)}</div>
        ) : (
          <EmptyState title="No shows available" message="Try another city or check back later." />
        )}
      </section>
    </div>
  );
}
