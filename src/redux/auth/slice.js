import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operation";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.isError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isError = null;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          refreshUser.rejected,
          logout.rejected
        ),
        (state, action) => {
          state.isError = action.payload || "Something went wrong";
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          refreshUser.pending,
          logout.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      );
  },
});

export const { clearError } = slice.actions;
export const authReducer = slice.reducer;
