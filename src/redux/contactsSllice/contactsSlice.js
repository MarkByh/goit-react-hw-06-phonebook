
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
}
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = [...payload];
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((contact) => contact.id !== payload.id);
      })

      .addMatcher(isAnyOf(
        fetchContacts.pending,
        addContact.pending,
        deleteContact.pending
      ), handlePending
      )

      .addMatcher(isAnyOf(
        fetchContacts.rejected,
        addContact.rejected,
        deleteContact.rejected
      ), handleRejected
      )

      .addMatcher(isAnyOf(
        fetchContacts.fulfilled,
        addContact.fulfilled,
        deleteContact.fulfilled
      ), handleFulfilled
      )
  },
});


export const contactsReducer = contactsSlice.reducer;
export const { addNewContact, removeContact } = contactsSlice.actions;


