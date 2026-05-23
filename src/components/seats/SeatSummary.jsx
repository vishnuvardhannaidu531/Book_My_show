import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectSelectedSeatCount, selectSelectedSeatsTotal } from "../../features/seats/seatSelectors";
import { formatCurrency } from "../../utils/formatters";
import Button from "../ui/Button";

const MotionDiv = motion.div;

export default function SeatSummary({ onContinue, loading }) {
  const count = useSelector(selectSelectedSeatCount);
  const total = useSelector(selectSelectedSeatsTotal);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-card-hover backdrop-blur-xl"
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white">Booking Summary</h3>
        <p className="text-xs text-zinc-400 mt-2">Review your selected seats</p>
      </div>

      {/* Summary Details */}
      <div className="space-y-4">
        {/* Selected Seats */}
        <MotionDiv
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-white/5 border border-white/10 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400 font-medium">Selected Seats</span>
            <div className="flex items-center gap-2">
              {count > 0 ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <strong className="text-lg text-white font-black">{count}</strong>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <strong className="text-lg text-yellow-400 font-black">Select seats</strong>
                </>
              )}
            </div>
          </div>
        </MotionDiv>

        {/* Price Breakdown */}
        {count > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Per Seat</span>
              <span>{formatCurrency(total / count)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Seats × {count}</span>
              <span>{formatCurrency(total / count * count)}</span>
            </div>
          </MotionDiv>
        )}

        {/* Total */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-400/15 to-white/5 p-4"
        >
          <div className="flex justify-between items-end">
            <span className="text-sm font-semibold text-zinc-300">Total Amount</span>
            <div className="text-right">
              <p className="text-3xl font-black bg-gradient-to-r from-brand to-brandSoft bg-clip-text text-transparent">
                {formatCurrency(total)}
              </p>
              <p className="text-xs text-zinc-400 mt-1">including all charges</p>
            </div>
          </div>
        </MotionDiv>
      </div>

      {/* CTA Button */}
      <MotionDiv
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          className="w-full py-4 text-base font-semibold"
          disabled={!count}
          loading={loading}
          onClick={onContinue}
        >
          {count ? "Proceed to Payment" : "Select Seats First"}
        </Button>
      </MotionDiv>

      {/* Info */}
      <p className="text-xs text-zinc-500 text-center border-t border-white/10 pt-4">
        Seats will be locked for 15 minutes
      </p>
    </MotionDiv>
  );
}
