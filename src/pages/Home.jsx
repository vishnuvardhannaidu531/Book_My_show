import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorState from "../components/common/ErrorState";
import MovieFilters from "../components/movie/MovieFilters";
import MovieGrid from "../components/movie/MovieGrid";
import TrendingRail from "../components/movie/TrendingRail";
import Button from "../components/ui/Button";
import { fetchMovies } from "../features/movies/movieSlice";
import { selectFilteredMovies, selectMoviesError, selectMoviesLoading, selectTrendingMovies } from "../features/movies/movieSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

const MotionDiv = motion.div;

export default function Home() {
  usePageTitle("Movies");
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);
  const trending = useSelector(selectTrendingMovies);
  const loading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(120deg,#18181b,#2b1013_55%,#09090b)] p-6 shadow-soft sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-35 lg:block" />
        <MotionDiv initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-2xl">
          <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase text-red-100">Now showing</span>
          <h1 className="mt-5 text-4xl font-black tracking-normal text-white sm:text-5xl">Book movie tickets without the chaos.</h1>
          <p className="mt-4 max-w-xl text-base text-zinc-300 sm:text-lg">
            {/* Browse movies, pick theatres, reserve seats, and complete payment with a state-managed production frontend. */}
          </p>
          <Button className="mt-6" onClick={() => document.getElementById("movies-section")?.scrollIntoView({ behavior: "smooth" })}>
            <PlayCircle className="h-5 w-5" />
            Explore Movies
          </Button>
        </MotionDiv>
      </section>

      {error && <ErrorState message={error} onRetry={() => dispatch(fetchMovies())} />}
      <TrendingRail movies={trending} />

      <section id="movies-section" className="space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-white">All movies</h2>
          {/* <p className="text-sm text-zinc-400">Search and filters operate on Redux movie state, not repeated API calls.</p> */}
        </div>
        <MovieFilters />
        <MovieGrid movies={movies} loading={loading} />
      </section>
    </div>
  );
}
