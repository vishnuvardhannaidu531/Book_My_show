export const getId = (item) => item?.id || item?._id;

export const getSeatNumber = (showSeat) =>
  showSeat?.seat?.seatNumber || showSeat?.seatNumber || showSeat?.label || `S${getId(showSeat)}`;

export const isSeatBooked = (showSeat) => {
  const status = String(showSeat?.status || showSeat?.seatStatus || "").toUpperCase();
  return status === "BOOKED" || status === "LOCKED" || showSeat?.booked === true;
};

export const getSeatPrice = (showSeat) => Number(showSeat?.price || showSeat?.seat?.price || 150);

export const getShowSeats = (show) => show?.availableSeats || show?.seats || show?.seatMap || [];

export const groupSeatsByRow = (seats = []) =>
  seats.reduce((rows, showSeat) => {
    const seatNumber = getSeatNumber(showSeat);
    const row = String(seatNumber).charAt(0).toUpperCase() || "A";
    return { ...rows, [row]: [...(rows[row] || []), showSeat] };
  }, {});

export const getSelectedSeatPayload = (selectedSeats = []) => selectedSeats.map((seat) => getId(seat));

export const normalizeSeatMapResponse = (payload) => {
  if (Array.isArray(payload)) {
    return { show: null, seats: payload };
  }

  return {
    show: payload,
    seats: getShowSeats(payload),
  };
};
