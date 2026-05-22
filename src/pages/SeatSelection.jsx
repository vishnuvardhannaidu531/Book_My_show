import { ArrowLeft } from "lucide-react";
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
      toast.success("Seats locked. Continue payment.");
      navigate("/payment");
    } else {
      toast.error(result.payload || "Seat lock failed");
    }
  };

  if (loading) {
    return <Skeleton className="h-[520px]" />;
  }

  return (
    <div className="space-y-6">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back to shows
      </Button>
      {error && <ErrorState message={error} onRetry={() => dispatch(fetchSeatMap(showId))} />}
      <div className="rounded-xl border border-white/10 bg-panel p-5">
        <h1 className="text-2xl font-black text-white">{show?.movie?.title || "Select seats"}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {show?.screen?.theatre?.name || "Theatre"} · {show?.screen?.name || "Screen"}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {seats.length ? <SeatGrid seats={seats} /> : <EmptyState title="No seats available" message="This show does not expose seat inventory yet." />}
        <SeatSummary onContinue={handleContinue} loading={locking} />
      </div>
    </div>
  );
}
