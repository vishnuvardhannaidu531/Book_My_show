import { useSelector } from "react-redux";
import { selectSelectedSeatCount, selectSelectedSeatsTotal } from "../../features/seats/seatSelectors";
import { formatCurrency } from "../../utils/formatters";
import Button from "../ui/Button";

export default function SeatSummary({ onContinue, loading }) {
  const count = useSelector(selectSelectedSeatCount);
  const total = useSelector(selectSelectedSeatsTotal);

  return (
    <aside className="rounded-xl border border-white/10 bg-panel p-5 shadow-soft">
      <h3 className="text-lg font-bold text-white">Booking Summary</h3>
      <div className="mt-4 space-y-3 text-sm text-zinc-300">
        <div className="flex justify-between">
          <span>Selected seats</span>
          <strong className="text-white">{count || "None"}</strong>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <strong className="text-xl text-brand">{formatCurrency(total)}</strong>
        </div>
      </div>
      <Button className="mt-5 w-full" disabled={!count} loading={loading} onClick={onContinue}>
        Proceed to Payment
      </Button>
    </aside>
  );
}
