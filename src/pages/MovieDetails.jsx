import { ArrowLeft, CalendarDays, Clock, Languages, Star } from "lucide-react";
import { motion } from "framer-motion";
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

const MotionDiv = motion.div;

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
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <MotionDiv
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" onClick={() => history.back()} className="border border-white/10">
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </Button>
      </MotionDiv>

      {movieError && <ErrorState message={movieError} onRetry={() => dispatch(fetchMovieById(movieId))} />}

      {movie && (
        <>
          {/* Movie Header Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-card-hover backdrop-blur-xl"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-brand/5 rounded-full blur-3xl" />
            </div>

            <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[300px_1fr]">
              {/* Poster */}
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl shadow-glow-lg"
              >
                <img
                  src={getPosterUrl(movie)}
                  alt={movie.title}
                  className="aspect-[2/3] w-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </MotionDiv>

              {/* Movie Info */}
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col justify-between"
              >
                {/* Title and Rating */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h1 className="text-4xl md:text-5xl font-black text-white pr-4">{movie.title}</h1>
                    {movie.rating && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400/20 border border-yellow-400/40">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">{movie.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-lg text-zinc-300 leading-relaxed">
                    {movie.description || "An exciting theatre experience awaits you."}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-400/15">
                        <Clock className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 uppercase">Duration</p>
                        <p className="text-lg font-bold text-white">{movie.durationMins || 120} min</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-400/15">
                        <Languages className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 uppercase">Language</p>
                        <p className="text-lg font-bold text-white">{movie.language || "English"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-400/15">
                        <CalendarDays className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 uppercase">Genre</p>
                        <p className="text-lg font-bold text-white">{movie.genre || "Drama"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* Shows Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header and Filter */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">Available Shows</h2>
                {/* <p className="text-zinc-400">Select a show and book your seats</p> */}
              </div>

              {/* Filter Section */}
              {/* <div className="glass rounded-xl p-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Input
                    placeholder="Search shows by city..."
                    value={city}
                    onChange={(event) => dispatch(setShowCity(event.target.value))}
                    className="glass"
                  />
                  <Button onClick={handleCityFilter} loading={showsLoading}>
                    Filter
                  </Button>
                </div>
              </div> */}
            </div>

            {/* Shows Grid */}
            {showsError && <ErrorState message={showsError} onRetry={() => dispatch(fetchShowsByMovie(movieId))} />}

            {showsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-32" />
                ))}
              </div>
            ) : shows.length > 0 ? (
              <div className="space-y-4">
                {shows.map((show, idx) => (
                  <MotionDiv
                    key={show.id || show._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ShowCard show={show} />
                  </MotionDiv>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No shows available"
                // message="Try searching with a different city or check back later."
              />
            )}
          </MotionDiv>
        </>
      )}
    </div>
  );
}
