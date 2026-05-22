import { Calendar, MapPin, ReceiptText, XCircle } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import { selectAuthUser } from "../features/auth/authSelectors";
import { cancelBooking, fetchUserBookings } from "../features/bookings/bookingSlice";
import { selectBookingCancelling, selectBookings, selectBookingsError, selectBookingsLoading } from "../features/bookings/bookingSelectors";
import { formatCurrency, formatDateTime } from "../utils/formatters";

export default function BookingHistory() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingsLoading);
  const cancelling = useSelector(selectBookingCancelling);
  const error = useSelector(selectBookingsError);

  useEffect(() => {
    if (user?.id) dispatch(fetchUserBookings(user.id));
  }, [dispatch, user?.id]);

  const handleCancel = async (bookingId) => {
    const result = await dispatch(cancelBooking(bookingId));
    if (cancelBooking.fulfilled.match(result)) toast.success("Booking cancelled");
    else toast.error(result.payload || "Unable to cancel booking");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white">My bookings</h1>
        <p className="mt-1 text-sm text-zinc-400">Booking history is fetched once into Redux and rendered from selectors.</p>
      </div>
      {error && <ErrorState message={error} onRetry={() => dispatch(fetchUserBookings(user?.id))} />}
      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-44" />)}</div>
      ) : bookings.length ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <article key={booking.id || booking._id} className="rounded-xl border border-white/10 bg-panel p-5 shadow-soft">
              <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <ReceiptText className="h-5 w-5 text-brand" />
                  <div>
                    <h2 className="font-bold text-white">{booking.bookingNumber || `Booking #${booking.id}`}</h2>
                    <p className="text-sm text-zinc-400">{booking.show?.movie?.title || "Movie"}</p>
                  </div>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${booking.status === "CONFIRMED" ? "bg-emerald-500/15 text-emerald-200" : "bg-zinc-500/15 text-zinc-300"}`}>
                  {booking.status || "PENDING"}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" />{booking.show?.screen?.theatre?.name || "Theatre"}</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" />{formatDateTime(booking.show?.startTime)}</span>
                <span>Seats: {booking.seats?.map((item) => item.seat?.seatNumber || item.seatNumber).join(", ") || "N/A"}</span>
                <span>Total: <strong className="text-brand">{formatCurrency(booking.totalAmount)}</strong></span>
              </div>
              {booking.status === "CONFIRMED" && (
                <Button className="mt-5" variant="danger" loading={cancelling} onClick={() => handleCancel(booking.id || booking._id)}>
                  <XCircle className="h-4 w-4" />
                  Cancel booking
                </Button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No bookings yet" message="Your confirmed movie tickets will appear here." />
      )}
    </div>
  );
}
