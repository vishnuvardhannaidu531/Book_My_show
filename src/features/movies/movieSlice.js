import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { getMovieByIdRequest, getMoviesRequest } from "./movieAPI";

const initialState = {
  items: [],
  selectedMovie: null,
  searchTerm: "",
  filters: { genre: "All", language: "All" },
  loading: false,
  detailsLoading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (_, { rejectWithValue }) => {
  try {
    return await getMoviesRequest();
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load movies"));
  }
});

export const fetchMovieById = createAsyncThunk("movies/fetchMovieById", async (movieId, { getState, rejectWithValue }) => {
  try {
    const existing = getState().movies.items.find((movie) => String(movie.id || movie._id) === String(movieId));
    return existing || (await getMovieByIdRequest(movieId));
  } catch (error) {
    return rejectWithValue(getApiError(error, "Failed to load movie details"));
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMovieFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedMovie, setMovieFilter, setSearchTerm } = movieSlice.actions;
export default movieSlice.reducer;
