import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { getId, normalizeSeatMapResponse } from "../../utils/normalizers";
import { storage } from "../../utils/storage";
import { getSeatMapRequest, lockSeatsRequest } from "./seatAPI";

const initialState = {
  seatMap: [],
  showSnapshot: storage.getCheckout()?.show || null,
  selectedShowId: storage.getCheckout()?.show?.id || null,
  selectedSeats: storage.getCheckout()?.seats || [],
  loading: false,
  locking: false,
  error: null,
};

export const fetchSeatMap = createAsyncThunk("seats/fetchSeatMap", async (showId, { rejectWithValue }) => {
  try {
    return normalizeSeatMapResponse(await getSeatMapRequest(showId));
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load seat map"));
  }
});

export const lockSeats = createAsyncThunk("seats/lockSeats", async (payload, { rejectWithValue }) => {
  try {
    return await lockSeatsRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to lock seats"));
  }
});

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seat = action.payload;
      const seatId = getId(seat);
      const exists = state.selectedSeats.some((selected) => String(getId(selected)) === String(seatId));
      state.selectedSeats = exists
        ? state.selectedSeats.filter((selected) => String(getId(selected)) !== String(seatId))
        : [...state.selectedSeats, seat];
      storage.setCheckout({ show: state.showSnapshot, seats: state.selectedSeats });
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
      storage.setCheckout({ show: state.showSnapshot, seats: [] });
    },
    clearCheckout: (state) => {
      state.seatMap = [];
      state.showSnapshot = null;
      state.selectedShowId = null;
      state.selectedSeats = [];
      storage.clearCheckout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatMap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatMap.fulfilled, (state, action) => {
        state.loading = false;
        state.seatMap = action.payload.seats;
        state.showSnapshot = action.payload.show;
        state.selectedShowId = action.payload.show?.id || null;
        storage.setCheckout({ show: action.payload.show, seats: state.selectedSeats });
      })
      .addCase(fetchSeatMap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(lockSeats.pending, (state) => {
        state.locking = true;
        state.error = null;
      })
      .addCase(lockSeats.fulfilled, (state) => {
        state.locking = false;
      })
      .addCase(lockSeats.rejected, (state, action) => {
        state.locking = false;
        state.error = action.payload;
      });
  },
});

export const { clearCheckout, clearSelectedSeats, toggleSeat } = seatSlice.actions;
export default seatSlice.reducer;
