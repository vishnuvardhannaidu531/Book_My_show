import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { getShowByIdRequest, getShowsByMovieAndCityRequest, getShowsByMovieRequest } from "./showAPI";

const initialState = {
  items: [],
  selectedShow: null,
  city: "",
  loading: false,
  detailsLoading: false,
  error: null,
};

export const fetchShowsByMovie = createAsyncThunk("shows/fetchShowsByMovie", async (movieId, { rejectWithValue }) => {
  try {
    return await getShowsByMovieRequest(movieId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load shows"));
  }
});

export const fetchShowsByCity = createAsyncThunk("shows/fetchShowsByCity", async (payload, { rejectWithValue }) => {
  try {
    return await getShowsByMovieAndCityRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to filter shows"));
  }
});

export const fetchShowById = createAsyncThunk("shows/fetchShowById", async (showId, { rejectWithValue }) => {
  try {
    return await getShowByIdRequest(showId);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load show"));
  }
});

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShowCity: (state, action) => {
      state.city = action.payload;
    },
    clearSelectedShow: (state) => {
      state.selectedShow = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsByMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowsByMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchShowsByMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShowsByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowsByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchShowsByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShowById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchShowById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedShow = action.payload;
      })
      .addCase(fetchShowById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedShow, setShowCity } = showSlice.actions;
export default showSlice.reducer;
