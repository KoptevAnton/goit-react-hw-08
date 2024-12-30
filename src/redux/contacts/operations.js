import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../auth/operations";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await goitApi.get("/contacts");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue("Contacts not found (404 error)");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await goitApi.delete(`/contacts/${id}`);
      toast.success(
        "The contact has been successfully deleted from the phone book."
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const response = await goitApi.post("/contacts", body);
      toast.success(
        "The contact has been successfully added to the phone book."
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (body, thunkAPI) => {
    console.log(body);
    const { id, name, number, originalName, originalNumber } = body;

    if (name === originalName && number === originalNumber) {
      toast.error("Your contact remains unchanged.");
      return { id, name, number };
    }

    try {
      const { id, name, number } = body;
      const response = await goitApi.patch(`/contacts/${id}`, { name, number });
      toast.success("The contact was successfully changed.");

      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
