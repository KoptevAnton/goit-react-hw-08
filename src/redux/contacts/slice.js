import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./operation";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, { payload }) => {
        const item = state.items.find(item => item.id === payload.id);
        item.name = payload.name;
        item.number = payload.number;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled,
          editContact.fulfilled
        ),
        state => {
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending,
          editContact.pending
        ),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected,
          editContact.rejected
        ),
        (state, { payload }) => {
          console.error("Error:", payload);
          state.loading = false;
          state.error = payload || "Something went wrong";
        }
      );
  },
});

export const { setError } = slice.actions;
export const contactsReducer = slice.reducer;
