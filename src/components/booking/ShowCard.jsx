import { MapPin, Monitor, Timer } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSelectedSeats } from "../../features/seats/seatSlice";
import { formatDateTime, formatTime } from "../../utils/formatters";
import Button from "../ui/Button";

export default function ShowCard({ show }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theatre = show.screen?.theatre;

  const handleSelect = () => {
    dispatch(clearSelectedSeats());
    navigate(`/shows/${show.id || show._id}/seats`);
  };

  return (
    <article className="grid gap-4 rounded-xl border border-white/10 bg-panel p-4 shadow-soft md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h3 className="text-lg font-bold text-white">{theatre?.name || "Theatre"}</h3>
        <div className="mt-3 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand" />
            {theatre?.city || "City"} {theatre?.address ? `, ${theatre.address}` : ""}
          </span>
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-brand" />
            {show.screen?.name || "Screen 1"}
          </span>
          <span className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-brand" />
            {formatDateTime(show.startTime)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
        <span className="rounded-full bg-brand/15 px-4 py-2 text-lg font-black text-red-100">{formatTime(show.startTime)}</span>
        <Button onClick={handleSelect}>Select Seats</Button>
      </div>
    </article>
  );
}
