import { motion } from "framer-motion";
import { Clapperboard, MapPin, Sparkles, Ticket } from "lucide-react";
import { createElement } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import MovieFilters from "../components/movie/MovieFilters";
import MovieGrid from "../components/movie/MovieGrid";
import CarouselSection from "../components/premium/CarouselSection";
import HeroSection from "../components/premium/HeroSection";
import { fetchMovies } from "../features/movies/movieSlice";
import { selectFilteredMovies, selectMoviesError, selectMoviesLoading, selectTrendingMovies } from "../features/movies/movieSelectors";
import { usePageTitle } from "../hooks/usePageTitle";
import { getPosterUrl } from "../utils/formatters";

const MotionSection = motion.section;

export default function Home() {
  usePageTitle("Movies");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(selectFilteredMovies);
  const trending = useSelector(selectTrendingMovies);
  const loading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);
  const featuredMovie = trending?.[0] || movies?.[0];
  const upcoming = movies?.slice(3, 9) || [];

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const openFeatured = () => {
    if (featuredMovie?.id || featuredMovie?._id) navigate(`/movies/${featuredMovie.id || featuredMovie._id}`);
  };

  return (
    <div className="bg-black">
      {featuredMovie && (
        <HeroSection
          title={featuredMovie.title}
          description={featuredMovie.description || "Reserve the best seats for a theatre experience built around big screens, rich sound, and zero friction."}
          backgroundImage={getPosterUrl(featuredMovie)}
          rating={featuredMovie.rating || 8.5}
          onPlayClick={openFeatured}
          onInfoClick={openFeatured}
          badges={["Featured", "Now Showing", featuredMovie.genre]}
        />
      )}

      <div className="relative mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-0 top-10 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-96 h-80 w-80 rounded-full bg-white/7 blur-3xl" />

        {error && <ErrorState message={error} onRetry={() => dispatch(fetchMovies())} />}

        {trending?.length > 0 && (
          <CarouselSection
            title="Trending Now"
            subtitle="High-demand shows and audience favorites near you"
            movies={trending}
            showsPerView={{ mobile: 1.2, tablet: 3, desktop: 4.5 }}
          />
        )}

        <MotionSection
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            { icon: Ticket, label: "Instant Booking", text: "Lock seats and pay securely in a polished flow." },
            { icon: Clapperboard, label: "Premium Shows", text: "Find current releases, trending titles, and theatre schedules." },
            { icon: MapPin, label: "City Filters", text: "Search by movie, genre, language, and local shows." },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-soft backdrop-blur-xl">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand">
                {createElement(Icon, { className: "h-5 w-5" })}
              </div>
              <h3 className="font-bold text-white">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            </div>
          ))}
        </MotionSection>

        {upcoming.length > 0 && (
          <CarouselSection
            title="Upcoming Spotlight"
            subtitle="More cinematic picks from the catalogue"
            movies={upcoming}
            showsPerView={{ mobile: 1.2, tablet: 3, desktop: 5 }}
          />
        )}

        <section id="movies-section" className="space-y-8 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Browse catalogue
                </div>
                <h2 className="text-3xl font-black text-white md:text-4xl">All Movies</h2>
                <p className="mt-2 text-sm text-zinc-400 md:text-base">
                  Search, filter, and pick the showtime that fits your night.
                </p>
              </div>
            </div>
            <MovieFilters />
          </motion.div>

          <MovieGrid movies={movies} loading={loading} />
        </section>
      </div>
    </div>
  );
}
