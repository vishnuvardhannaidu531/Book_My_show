import { getSeatPrice } from "../../utils/normalizers";
import { storage } from "../../utils/storage";

export const selectSeatMap = (state) => state.seats.seatMap;
export const selectSeatMapLoading = (state) => state.seats.loading;
export const selectCheckoutShow = (state) => state.seats.showSnapshot || storage.getCheckout()?.show;
export const selectSelectedSeats = (state) => state.seats.selectedSeats;
export const selectCheckoutSeats = (state) => (state.seats.selectedSeats.length ? state.seats.selectedSeats : storage.getCheckout()?.seats || []);
export const selectSeatsLocking = (state) => state.seats.locking;
export const selectSeatsError = (state) => state.seats.error;
export const selectSelectedSeatCount = (state) => selectCheckoutSeats(state).length;
export const selectSelectedSeatsTotal = (state) =>
  selectCheckoutSeats(state).reduce((sum, seat) => sum + getSeatPrice(seat), 0);
