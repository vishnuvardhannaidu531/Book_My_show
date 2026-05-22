import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "../../features/seats/seatSlice";
import { selectSelectedSeats } from "../../features/seats/seatSelectors";
import { getId, getSeatNumber, groupSeatsByRow, isSeatBooked } from "../../utils/normalizers";

export default function SeatGrid({ seats = [] }) {
  const dispatch = useDispatch();
  const selectedSeats = useSelector(selectSelectedSeats);
  const seatsByRow = groupSeatsByRow(seats);
  const isSelected = (seat) => selectedSeats.some((selected) => String(getId(selected)) === String(getId(seat)));

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-panel p-4 sm:p-6">
      <div className="mx-auto mb-8 h-10 max-w-2xl rounded-b-[60%] border-b-4 border-brand bg-white/10 text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
        Screen
      </div>
      <div className="mx-auto w-max min-w-full space-y-3">
        {Object.keys(seatsByRow)
          .sort()
          .map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-sm font-bold text-brand">{row}</span>
              <div className="flex gap-2">
                {seatsByRow[row]
                  .sort((a, b) => String(getSeatNumber(a)).localeCompare(String(getSeatNumber(b)), undefined, { numeric: true }))
                  .map((seat) => {
                    const booked = isSeatBooked(seat);
                    const selected = isSelected(seat);
                    return (
                      <button
                        key={getId(seat)}
                        disabled={booked}
                        onClick={() => dispatch(toggleSeat(seat))}
                        className={`grid h-9 w-9 place-items-center rounded-md border text-[11px] font-bold transition sm:h-10 sm:w-10 ${
                          booked
                            ? "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
                            : selected
                              ? "border-white bg-brand text-white shadow-glow"
                              : "border-white/10 bg-white/10 text-zinc-200 hover:border-brand hover:bg-brand/20"
                        }`}
                      >
                        {getSeatNumber(seat)}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-zinc-400">
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-white/10" />Available</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-brand" />Selected</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-zinc-900" />Booked</span>
      </div>
    </div>
  );
}
