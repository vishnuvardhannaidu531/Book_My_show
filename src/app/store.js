import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bookingReducer from "../features/bookings/bookingSlice";
import movieReducer from "../features/movies/movieSlice";
import paymentReducer from "../features/payments/paymentSlice";
import seatReducer from "../features/seats/seatSlice";
import showReducer from "../features/shows/showSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    shows: showReducer,
    seats: seatReducer,
    bookings: bookingReducer,
    payments: paymentReducer,
  },
});
