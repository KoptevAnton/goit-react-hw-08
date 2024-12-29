import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthHeader = token => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const response = await goitApi.post("/users/signup", credentials);

      setAuthHeader(response.data.token);
      toast.success(
        `Welcome, ${response.data.user.name}! You have successfully registered.`,
        {
          icon: "👏",
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkApi.rejectWithValue(
          "SorryFFF. Maybe user with these credentials already exists. (status code 400)"
        );
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await goitApi.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      toast.success(
        `Hello, ${response.data.user.name} you have successfully logged in.`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkApi.rejectWithValue(
          "Sorry, you entered incorrect credentials. (status code 400)"
        );
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await goitApi.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue("Please authenticate.");
    }

    try {
      setAuthHeader(savedToken);
      const { data } = await goitApi.get("/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
