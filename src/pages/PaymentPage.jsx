import { CreditCard, ShieldCheck } from "lucide-react";
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
          toast.success("Payment successful");
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
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-white/10 bg-panel p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand">
            <CreditCard className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black text-white">Payment</h1>
            <p className="text-sm text-zinc-400">Create booking, create Razorpay order, verify payment.</p>
          </div>
        </div>
        <div className="mt-6 space-y-3 rounded-xl bg-white/[0.04] p-4 text-sm text-zinc-300">
          <p><strong className="text-white">Movie:</strong> {show?.movie?.title || "Selected movie"}</p>
          <p><strong className="text-white">Theatre:</strong> {show?.screen?.theatre?.name || "Theatre"}</p>
          <p><strong className="text-white">Show:</strong> {formatDateTime(show?.startTime)}</p>
          <p><strong className="text-white">Seats:</strong> {seats.length}</p>
          <p className="text-lg"><strong className="text-white">Total:</strong> <span className="text-brand">{formatCurrency(total)}</span></p>
        </div>
        <Button className="mt-6 w-full" disabled={!show || !seats.length} loading={bookingLoading || paymentLoading} onClick={handlePayment}>
          <ShieldCheck className="h-5 w-5" />
          Pay securely
        </Button>
      </div>
      {booking && <p className="text-center text-sm text-zinc-500">Latest booking reference: {booking.bookingNumber || booking.id}</p>}
    </div>
  );
}
