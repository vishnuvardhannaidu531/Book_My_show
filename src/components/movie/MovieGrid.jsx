import { motion } from "framer-motion";
import EmptyState from "../common/EmptyState";
import Skeleton from "../ui/Skeleton";
import PremiumMovieCard from "../premium/PremiumMovieCard";

const MotionDiv = motion.div;

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
    return <EmptyState title="No movie found" />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie, idx) => (
        <MotionDiv
          key={movie.id || movie._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
        >
          <PremiumMovieCard movie={movie} />
        </MotionDiv>
      ))}
    </div>
  );
}
