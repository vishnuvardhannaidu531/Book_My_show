import { MapPin, Monitor, Timer, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSelectedSeats } from "../../features/seats/seatSlice";
import { formatDateTime, formatTime } from "../../utils/formatters";
import Button from "../ui/Button";

const MotionArticle = motion.article;

export default function ShowCard({ show }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theatre = show.screen?.theatre;

  const handleSelect = () => {
    dispatch(clearSelectedSeats());
    navigate(`/shows/${show.id || show._id}/seats`);
  };

  return (
    <MotionArticle
      whileHover={{ scale: 1.01, boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45), 0 0 38px rgba(245, 158, 11, 0.12)" }}
      className="group grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-brand/40 md:grid-cols-[1fr_auto] md:items-center"
    >
      {/* Show Info */}
      <div className="space-y-4">
        {/* Theatre Name */}
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-brand transition-colors">
            {theatre?.name || "Theatre"}
          </h3>
          {theatre?.rating && (
            <div className="mt-2 flex items-center gap-2 text-sm text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              {theatre.rating}/5 Rating
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid gap-3 text-sm">
          <span className="inline-flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 text-zinc-300 border border-white/10">
            <MapPin className="h-5 w-5 text-brand flex-shrink-0" />
            <span>
              {theatre?.city || "City"}
              {theatre?.address ? ` | ${theatre.address}` : ""}
            </span>
          </span>

          <div className="grid gap-3 sm:grid-cols-2">
            <span className="inline-flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 text-zinc-300 border border-white/10">
              <Monitor className="h-5 w-5 text-brand flex-shrink-0" />
              <span>{show.screen?.name || "Screen 1"}</span>
            </span>

            <span className="inline-flex items-center gap-3 rounded-lg bg-white/5 px-4 py-2.5 text-zinc-300 border border-white/10">
              <Timer className="h-5 w-5 text-brand flex-shrink-0" />
              <span>{formatDateTime(show.startTime)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center"
      >
        <div className="text-right">
          <p className="text-xs text-zinc-400 mb-2">Show Time</p>
          <span className="inline-block rounded-xl bg-gradient-to-r from-brand to-brandSoft px-6 py-3 text-xl font-black text-white shadow-glow">
            {formatTime(show.startTime)}
          </span>
        </div>

        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleSelect} className="gap-2">
            Book Now
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </MotionArticle>
  );
}
