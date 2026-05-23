import { ArrowLeft, Clapperboard, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import SeatGrid from "../components/seats/SeatGrid";
import SeatSummary from "../components/seats/SeatSummary";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { clearSelectedSeats, fetchSeatMap, lockSeats } from "../features/seats/seatSlice";
import { selectCheckoutShow, selectSeatMap, selectSeatMapLoading, selectSeatsError, selectSeatsLocking, selectSelectedSeats } from "../features/seats/seatSelectors";
import { getSelectedSeatPayload } from "../utils/normalizers";

const MotionDiv = motion.div;

export default function SeatSelection() {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const show = useSelector(selectCheckoutShow);
  const selectedSeats = useSelector(selectSelectedSeats);
  const loading = useSelector(selectSeatMapLoading);
  const locking = useSelector(selectSeatsLocking);
  const error = useSelector(selectSeatsError);
  const seats = useSelector(selectSeatMap);

  useEffect(() => {
    dispatch(clearSelectedSeats());
    dispatch(fetchSeatMap(showId));
  }, [dispatch, showId]);

  const handleContinue = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue booking.");
      navigate("/login", { state: { from: location } });
      return;
    }

    const result = await dispatch(lockSeats({ showId: show?.id || showId, seatIds: getSelectedSeatPayload(selectedSeats) }));
    if (lockSeats.fulfilled.match(result)) {
      toast.success("Seats locked. Proceeding to payment...");
      navigate("/payment");
    } else {
      toast.error(result.payload || "Seat lock failed");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20" />
        <Skeleton className="h-[520px]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <MotionDiv
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" onClick={() => navigate(-1)} className="border border-white/10">
          <ArrowLeft className="h-4 w-4" />
          Back to Shows
        </Button>
      </MotionDiv>

      {error && <ErrorState message={error} onRetry={() => dispatch(fetchSeatMap(showId))} />}

      {/* Show Info Card */}
      {show && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card-hover backdrop-blur-xl"
        >
          <h1 className="text-3xl font-black text-white">{show?.movie?.title || "Select Seats"}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" />{show?.screen?.theatre?.name || "Theatre"}</span>
            <span className="inline-flex items-center gap-2"><Clapperboard className="h-4 w-4 text-brand" />{show?.screen?.name || "Screen"}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand" />{new Date(show?.startTime).toLocaleString()}</span>
          </div>
        </MotionDiv>
      )}

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Seat Grid */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {seats.length ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Select Your Seats</h2>
                <p className="text-sm text-zinc-400">Click on any available seat to select</p>
              </div>
              <SeatGrid seats={seats} />
            </div>
          ) : (
            <EmptyState
              title="No seats available"
              message="This show does not have seat inventory available yet."
            />
          )}
        </MotionDiv>

        {/* Booking Summary Sidebar - Sticky */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-20 lg:h-fit"
        >
          <SeatSummary onContinue={handleContinue} loading={locking} />
        </MotionDiv>
      </div>
    </div>
  );
}
