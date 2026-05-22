import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { createOrderRequest, markPaymentFailedRequest, verifyPaymentRequest } from "./paymentAPI";

const initialState = {
  order: null,
  status: "idle",
  loading: false,
  error: null,
};

export const createPaymentOrder = createAsyncThunk("payments/createPaymentOrder", async (bookingId, { rejectWithValue }) => {
  try {
    return await createOrderRequest(bookingId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to create payment order"));
  }
});

export const verifyPayment = createAsyncThunk("payments/verifyPayment", async (payload, { rejectWithValue }) => {
  try {
    return await verifyPaymentRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Payment verification failed"));
  }
});

export const markPaymentFailed = createAsyncThunk("payments/markPaymentFailed", async (payload, { rejectWithValue }) => {
  try {
    return await markPaymentFailedRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Unable to update payment status"));
  }
});

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    resetPayment: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.status = "creating-order";
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "order-created";
        state.order = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.status = "verifying";
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.status = "success";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(markPaymentFailed.fulfilled, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
