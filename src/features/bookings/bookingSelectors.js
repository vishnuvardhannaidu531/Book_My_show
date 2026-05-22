export const selectBookings = (state) => state.bookings.items;
export const selectCurrentBooking = (state) => state.bookings.currentBooking;
export const selectBookingsLoading = (state) => state.bookings.loading;
export const selectBookingCreating = (state) => state.bookings.creating;
export const selectBookingCancelling = (state) => state.bookings.cancelling;
export const selectBookingsError = (state) => state.bookings.error;
