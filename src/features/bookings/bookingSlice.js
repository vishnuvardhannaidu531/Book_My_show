import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { cancelBookingRequest, createBookingRequest, getBookingByIdRequest, getUserBookingsRequest } from "./bookingAPI";

const initialState = {
  items: [],
  currentBooking: null,
  loading: false,
  creating: false,
  cancelling: false,
  error: null,
};

export const createBooking = createAsyncThunk("bookings/createBooking", async (payload, { rejectWithValue }) => {
  try {
    return await createBookingRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to create booking"));
  }
});

export const fetchBookingById = createAsyncThunk("bookings/fetchBookingById", async (bookingId, { rejectWithValue }) => {
  try {
    return await getBookingByIdRequest(bookingId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to fetch booking"));
  }
});

export const fetchUserBookings = createAsyncThunk("bookings/fetchUserBookings", async (userId, { rejectWithValue }) => {
  try {
    return await getUserBookingsRequest(userId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load bookings"));
  }
});

export const cancelBooking = createAsyncThunk("bookings/cancelBooking", async (bookingId, { rejectWithValue }) => {
  try {
    return await cancelBookingRequest(bookingId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to cancel booking"));
  }
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.creating = false;
        state.currentBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.currentBooking = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.cancelling = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancelling = false;
        const id = action.meta.arg;
        state.items = state.items.map((booking) =>
          String(booking.id || booking._id) === String(id) ? { ...booking, status: "CANCELLED" } : booking,
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelling = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
