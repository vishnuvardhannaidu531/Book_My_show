import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "../../features/seats/seatSlice";
import { selectSelectedSeats } from "../../features/seats/seatSelectors";
import {
  getId,
  getSeatNumber,
  groupSeatsByRow,
  isSeatBooked,
} from "../../utils/normalizers";

const MotionButton = motion.button;

export default function SeatGrid({ seats = [] }) {
  const dispatch = useDispatch();

  const selectedSeats = useSelector(selectSelectedSeats);

  const seatsByRow = groupSeatsByRow(seats);

  const isSelected = (seat) =>
    selectedSeats.some(
      (selected) => String(getId(selected)) === String(getId(seat))
    );

  const containerVariants = {
    hidden: { opacity: 0 },

    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
    },

    show: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-soft backdrop-blur-xl sm:p-6 lg:p-8">
      {/* SCREEN */}
      <div className="mx-auto mb-14 max-w-4xl">
        <div className="relative">
          <div className="mx-auto flex h-14 w-[85%] items-center justify-center rounded-b-[50px] border-b-4 border-brand/60 bg-gradient-to-b from-brand/20 to-brand/5 shadow-glow">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-300">
              Screen
            </span>
          </div>

          <div className="absolute inset-0 mx-auto h-14 w-[85%] rounded-b-[50px] bg-brand/10 blur-3xl" />
        </div>
      </div>

      {/* SEATS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {Object.keys(seatsByRow)
          .sort()
          .map((row) => {
            const rowSeats = seatsByRow[row].sort((a, b) =>
              String(getSeatNumber(a)).localeCompare(
                String(getSeatNumber(b)),
                undefined,
                {
                  numeric: true,
                }
              )
            );

            const middleIndex = Math.ceil(rowSeats.length / 2);

            const leftSeats = rowSeats.slice(0, middleIndex);

            const rightSeats = rowSeats.slice(middleIndex);

            return (
              <motion.div
                key={row}
                variants={itemVariants}
                className="flex items-center justify-center gap-2"
              >
                {/* ROW LABEL */}
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-sm font-bold text-brand">
                  {row}
                </div>

                {/* LEFT SEATS */}
                <div className="flex flex-wrap items-center justify-end gap-2 max-w-[42%]">
                  {leftSeats.map((seat) => {
                    const booked = isSeatBooked(seat);

                    const selected = isSelected(seat);

                    return (
                      <SeatButton
                        key={getId(seat)}
                        seat={seat}
                        booked={booked}
                        selected={selected}
                        dispatch={dispatch}
                      />
                    );
                  })}
                </div>

                {/* AISLE */}
                <div className="w-6 sm:w-10" />

                {/* RIGHT SEATS */}
                <div className="flex flex-wrap items-center justify-start gap-2 max-w-[42%]">
                  {rightSeats.map((seat) => {
                    const booked = isSeatBooked(seat);

                    const selected = isSelected(seat);

                    return (
                      <SeatButton
                        key={getId(seat)}
                        seat={seat}
                        booked={booked}
                        selected={selected}
                        dispatch={dispatch}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
      </motion.div>

      {/* LEGEND */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6 text-xs text-zinc-400"
      >
        <Legend color="bg-white/10 border border-white/20" label="Available" />

        <Legend
          color="bg-gradient-to-br from-brand to-brandSoft border border-white/40"
          label="Selected"
        />

        <Legend
          color="bg-zinc-900/50 border border-zinc-800"
          label="Booked"
        />
      </motion.div>
    </div>
  );
}

/* ========================================= */

function SeatButton({
  seat,
  booked,
  selected,
  dispatch,
}) {
  return (
    <MotionButton
      disabled={booked}
      onClick={() => dispatch(toggleSeat(seat))}
      whileHover={!booked ? { scale: 1.08, y: -2 } : {}}
      whileTap={!booked ? { scale: 0.95 } : {}}
      className={`grid h-8 w-8 place-items-center rounded-md border text-[10px] font-bold transition-all duration-200 sm:h-9 sm:w-9 sm:text-xs ${
        booked
          ? "cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-600"
          : selected
          ? "border-white/50 bg-gradient-to-br from-brand to-brandSoft text-white shadow-glow"
          : "border-white/20 bg-white/10 text-zinc-300 hover:border-brand/50 hover:bg-brand/10"
      }`}
    >
      {getSeatNumber(seat)}
    </MotionButton>
  );
}

/* ========================================= */

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-4 w-4 rounded-md ${color}`} />

      <span>{label}</span>
    </div>
  );
}