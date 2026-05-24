import { Calendar, MapPin, ReceiptText, Ticket, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import { selectAuthUser } from "../features/auth/authSelectors";
import { cancelBooking, fetchUserBookings } from "../features/bookings/bookingSlice";
import { selectBookingCancelling, selectBookings, selectBookingsError, selectBookingsLoading } from "../features/bookings/bookingSelectors";
import { formatCurrency, formatDateTime } from "../utils/formatters";

const MotionArticle = motion.article;

const TABS = [
  { key: "ALL", label: "All" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "CANCELLED", label: "Cancelled" },
];

export default function BookingHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingsLoading);
  const cancelling = useSelector(selectBookingCancelling);
  const error = useSelector(selectBookingsError);

  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    if (user?.id) dispatch(fetchUserBookings(user.id));
  }, [dispatch, user?.id]);

  const filtered = useMemo(() => {
    if (activeTab === "ALL") return bookings;
    return bookings.filter((b) => (b.status || "").toUpperCase() === activeTab);
  }, [bookings, activeTab]);

  const handleCancel = async (bookingId) => {
    const result = await dispatch(cancelBooking(bookingId));
    if (cancelBooking.fulfilled.match(result)) toast.success("Booking cancelled");
    else toast.error(result.payload || "Unable to cancel booking");
  };

  const posterUrl = (booking) => booking?.show?.movie?.poster || null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">My Bookings</h1>
          <p className="mt-1 text-sm text-zinc-400">Your cinematic tickets — beautifully presented.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/movies')}>Explore movies</Button>
        </div>
      </div>

      {error && <ErrorState message={error} onRetry={() => dispatch(fetchUserBookings(user?.id))} />}

      {/* Tabs */}
      <div className="flex gap-3">
        {TABS.map((tab) => {
          const count = tab.key === "ALL" ? bookings.length : bookings.filter((b) => (b.status || "").toUpperCase() === tab.key).length;
          const active = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${active ? "bg-gradient-to-br from-red-600 to-red-500 text-white shadow-[0_8px_30px_rgba(239,68,68,0.18)] ring-1 ring-red-500" : "bg-white/3 text-zinc-200 hover:bg-white/5"}`}
            >
              <span className="uppercase tracking-wide">{tab.label}</span>
              <span className="ml-2 inline-block rounded-full bg-white/6 px-2 py-0.5 text-xs font-medium text-zinc-200">{count}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-48" />)}</div>
      ) : filtered.length ? (
        <div className="grid gap-6">
          {filtered.map((booking, idx) => {
            const poster = posterUrl(booking);
            const isConfirmed = (booking.status || "").toUpperCase() === "CONFIRMED";
            return (
              <MotionArticle
                key={booking.id || booking._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ delay: idx * 0.03 }}
                className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 p-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(239,68,68,0.16)]"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Poster */}
                  <div className="relative w-full md:w-64 lg:w-72 flex-shrink-0">
                    {poster ? (
                      <img src={poster} alt={booking.show?.movie?.title || 'Poster'} className="h-56 w-full object-cover md:h-full md:rounded-l-3xl md:rounded-r-none" />
                    ) : (
                      <div className="h-56 w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 flex items-center justify-center text-white md:h-full md:rounded-l-3xl md:rounded-r-none">
                        <div className="px-4 text-center">
                          <p className="text-lg font-bold">{booking.show?.movie?.title || 'Untitled'}</p>
                        </div>
                      </div>
                    )}

                    {/* Floating badge */}
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/6">
                      {isConfirmed ? 'CONFIRMED' : (booking.status || 'PENDING')}
                    </div>

                    {/* Left/Right punch holes */}
                    <div className="hidden md:block">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black" style={{ boxShadow: '0 0 0 6px rgba(0,0,0,0.6), 0 0 0 8px rgba(255,255,255,0.02) inset' }} />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black" style={{ boxShadow: '0 0 0 6px rgba(0,0,0,0.6), 0 0 0 8px rgba(255,255,255,0.02) inset' }} />
                    </div>
                  </div>

                  {/* Dashed divider */}
                  <div className="hidden md:flex items-stretch">
                    <div className="mx-6 my-6 w-px border-l-2 border-dashed border-white/6" />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-4 p-5 md:p-6 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-white leading-tight md:text-3xl lg:text-4xl shadow-[0_8px_24px_rgba(0,0,0,0.6)]" style={{ textShadow: '0 8px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(128,0,128,0.06)' }}>{booking.show?.movie?.title || 'Movie'}</h2>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-xs text-amber-200 bg-black/20 px-2 py-0.5 rounded-lg ring-1 ring-white/6">Booking #{booking.bookingNumber || booking.id || booking._id}</span>
                        </div>
                        <p className="mt-2 text-sm text-zinc-200">{booking.show?.screen?.theatre?.name || 'Theatre'}</p>
                        <p className="mt-2 text-xs text-zinc-400"><Calendar className="inline-block mr-2 h-4 w-4 text-zinc-400" />{formatDateTime(booking.show?.startTime)}</p>
                      </div>

                      <div className="flex items-start flex-col gap-2">
                        <div className="text-sm text-zinc-300">Amount</div>
                        <div className="text-2xl font-extrabold text-red-500">{formatCurrency(booking.totalAmount)}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Ticket className="h-4 w-4 text-zinc-300" />
                        <span className="font-medium">Seats:</span>
                        <span className="ml-1 flex flex-wrap items-center gap-2">
                          {booking.seats?.length ? booking.seats.map((s, i) => (
                            <span key={i} className="rounded-full bg-gradient-to-r from-white/6 to-white/4 px-2 py-1 text-xs font-medium text-white ring-1 ring-white/6">{s.seat?.seatNumber || s.seatNumber}</span>
                          )) : <span className="text-zinc-400">N/A</span>}
                        </span>
                      </div>

                      <div className="ml-auto flex items-center gap-3">
                        {booking.status === 'CONFIRMED' && (
                          <Button
                            variant="danger"
                            loading={cancelling}
                            onClick={() => handleCancel(booking.id || booking._id)}
                            className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-semibold shadow-[0_6px_24px_rgba(239,68,68,0.18)] hover:scale-105 transition-transform"
                          >
                            <XCircle className="h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-sm text-zinc-400">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <span>{booking.show?.screen?.theatre?.address || 'Location info'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionArticle>
            );
          })}
        </div>
      ) : (
        <div className="grid place-items-center py-20">
          <div className="max-w-xl text-center">
            <div className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-[0_20px_60px_rgba(239,68,68,0.18)]">
              <Ticket className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-white">No movie nights yet 🍿</h3>
            <p className="mt-3 text-sm text-zinc-400">Your confirmed tickets will appear here. Start exploring showtimes and reserve your seats.</p>
            <div className="mt-6">
              <Button onClick={() => navigate('/movies')} className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold">Explore Movies</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
