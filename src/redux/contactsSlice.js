import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from "./contactsOps";

const initialState = {
  items: [
    {
      createdAt: "2024-12-18T19:12:00.352Z",
      name: "Anna",
      number: "263-702-4520",
      id: "0",
    },
  ],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: builder => {
    builder
      // TODO: destructurize payload
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const item = state.items.find(item => item.id === action.payload.id);
        item.name = action.payload.name;
        item.number = action.payload.number;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled,
          editContact.fulfilled
        ),
        (state, action) => {
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
        (state, action) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected,
          editContact.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const selectContacts = state => state.contacts.items;
export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.loading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (items, name) => {
    console.log('first')
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredItems;
  }
);

export const contactsReducer = slice.reducer;
