import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiError } from "../../api/axios";
import { storage } from "../../utils/storage";
import { loginRequest, signupRequest } from "./authAPI";

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: Boolean(storage.getToken()),
  loading: false,
  error: null,
};

const normalizeAuthResponse = (data) => {
  const token = data?.jwt || data?.token || data?.accessToken;
  const user = data?.user || {
    id: data?.userId || data?.id,
    username: data?.username,
    email: data?.email,
  };
  return { token, user };
};

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginRequest(credentials);
    return normalizeAuthResponse(data);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Login failed"));
  }
});

export const signupUser = createAsyncThunk("auth/signupUser", async (payload, { rejectWithValue }) => {
  try {
    return await signupRequest(payload);
  } catch (error) {
    return rejectWithValue(getApiError(error, "Signup failed"));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      storage.clearAuth();
    },
    markUnauthorized: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      storage.clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = Boolean(action.payload.token);
        storage.setToken(action.payload.token);
        storage.setUser(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, markUnauthorized } = authSlice.actions;
export default authSlice.reducer;
