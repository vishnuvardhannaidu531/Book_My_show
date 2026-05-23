import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, ArrowLeft, Ticket, MapPin, Clock, Users } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { RAZORPAY_KEY } from "../constants/config";
import { selectAuthUser } from "../features/auth/authSelectors";
import { createBooking, fetchBookingById } from "../features/bookings/bookingSlice";
import { selectBookingCreating, selectCurrentBooking } from "../features/bookings/bookingSelectors";
import { createPaymentOrder, markPaymentFailed, verifyPayment } from "../features/payments/paymentSlice";
import { selectPaymentLoading } from "../features/payments/paymentSelectors";
import { clearCheckout } from "../features/seats/seatSlice";
import { selectCheckoutSeats, selectCheckoutShow, selectSelectedSeatsTotal } from "../features/seats/seatSelectors";
import { formatCurrency, formatDateTime } from "../utils/formatters";
import { getSelectedSeatPayload } from "../utils/normalizers";

const MotionDiv = motion.div;

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const show = useSelector(selectCheckoutShow);
  const seats = useSelector(selectCheckoutSeats);
  const total = useSelector(selectSelectedSeatsTotal);
  const booking = useSelector(selectCurrentBooking);
  const bookingLoading = useSelector(selectBookingCreating);
  const paymentLoading = useSelector(selectPaymentLoading);

  useEffect(() => {
    if (!show || !seats.length) navigate("/movies", { replace: true });
  }, [navigate, seats.length, show]);

  const handlePayment = async () => {
    const bookingResult = await dispatch(
      createBooking({
        userId: user?.id,
        showId: show?.id || show?._id,
        seatIds: getSelectedSeatPayload(seats),
        paymentMethod: "RAZORPAY",
      }),
    );

    if (!createBooking.fulfilled.match(bookingResult)) {
      toast.error(bookingResult.payload || "Booking failed");
      return;
    }

    const createdBooking = bookingResult.payload;
    const orderResult = await dispatch(createPaymentOrder(createdBooking.id || createdBooking._id));
    if (!createPaymentOrder.fulfilled.match(orderResult)) {
      toast.error(orderResult.payload || "Payment order failed");
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Unable to load Razorpay");
      return;
    }

    const order = orderResult.payload;
    const orderId = order.id || order.orderId || order.razorpayOrderId;
    const bookingId = createdBooking.id || createdBooking._id;
    const razorpay = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: order.amount || order.amountDue,
      currency: order.currency || "INR",
      name: "MovieVerse",
      description: `${show?.movie?.title || "Movie"} - ${seats.length} seats`,
      order_id: orderId,
      prefill: { name: user?.username, email: user?.email },
      theme: { color: "#e50914" },
      handler: async (response) => {
        const verifyResult = await dispatch(
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId,
          }),
        );
        if (verifyPayment.fulfilled.match(verifyResult)) {
          toast.success("Payment successful!");
          dispatch(clearCheckout());
          await dispatch(fetchBookingById(createdBooking.id || createdBooking._id));
          navigate("/bookings");
        } else {
          toast.error(verifyResult.payload || "Verification failed");
        }
      },
      modal: {
        ondismiss: () => {
          dispatch(markPaymentFailed({ razorpay_order_id: orderId, bookingId }));
          toast.error("Payment cancelled");
        },
      },
    });

    razorpay.on("payment.failed", (response) => {
      dispatch(markPaymentFailed({ razorpay_order_id: orderId, bookingId }));
      toast.error(response.error?.description || "Payment failed");
    });

    razorpay.open();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <MotionDiv
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" onClick={() => navigate(-1)} className="border border-white/10">
          <ArrowLeft className="h-4 w-4" />
          Back to Seats
        </Button>
      </MotionDiv>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Payment Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-card-hover backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brandSoft flex items-center justify-center shadow-glow">
              <CreditCard className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Secure Payment</h1>
              <p className="text-sm text-zinc-400 mt-1">Complete your booking securely</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Booking Details</h2>

            {/* Movie */}
            <MotionDiv
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Movie</p>
                  <p className="text-lg font-bold text-white mt-1">{show?.movie?.title || "Selected movie"}</p>
                </div>
                <Ticket className="h-5 w-5 text-brand flex-shrink-0 mt-1" />
              </div>
            </MotionDiv>

            {/* Theatre & Screen */}
            <div className="grid grid-cols-2 gap-4">
              <MotionDiv
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Theatre</p>
                    <p className="text-sm font-bold text-white mt-1">{show?.screen?.theatre?.name || "Theatre"}</p>
                  </div>
                </div>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Show Time</p>
                    <p className="text-sm font-bold text-white mt-1">{formatDateTime(show?.startTime)}</p>
                  </div>
                </div>
              </MotionDiv>
            </div>

            {/* Seats */}
            <MotionDiv
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-brand" />
                  <div>
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Selected Seats</p>
                    <p className="text-lg font-bold text-white mt-1">{seats.length} seats</p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Security Info */}
          <div className="flex items-center gap-2 p-4 rounded-xl bg-green-400/10 border border-green-400/30 mb-8">
            <ShieldCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300">Your payment is secure and encrypted with 256-bit SSL</p>
          </div>

          {/* Payment Button */}
          <MotionDiv
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full py-4 text-base font-semibold gap-2"
              disabled={!show || !seats.length}
              loading={bookingLoading || paymentLoading}
              onClick={handlePayment}
            >
              <ShieldCheck className="h-5 w-5" />
              {bookingLoading || paymentLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </MotionDiv>

          {/* Reference */}
          {booking && (
            <p className="mt-4 text-center text-xs text-zinc-500 border-t border-white/10 pt-4">
              Booking Reference: <span className="text-zinc-400 font-mono">{booking.bookingNumber || booking.id}</span>
            </p>
          )}
        </MotionDiv>

        {/* Price Summary Sidebar */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:sticky lg:top-20 lg:h-fit"
        >
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-panel to-panelSoft p-6 shadow-card-hover space-y-6">
            <h3 className="text-lg font-black text-white">Price Summary</h3>

            <div className="space-y-3 text-sm border-b border-white/10 pb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Seats ({seats.length})</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Convenience Fee</span>
                <span className="text-yellow-400 text-xs">Included</span>
              </div>
            </div>

            <div className="glass rounded-xl p-4 space-y-2">
              <p className="text-xs text-zinc-400 uppercase font-semibold">Total Amount</p>
              <p className="text-3xl font-black bg-gradient-to-r from-brand to-brandSoft bg-clip-text text-transparent">
                {formatCurrency(total)}
              </p>
            </div>

            <div className="text-xs text-zinc-500 text-center space-y-1">
              <p>Secure payment gateway</p>
              <p>Instant confirmation</p>
              <p>Ticket on email</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
