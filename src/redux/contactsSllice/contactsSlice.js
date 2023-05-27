
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
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

      .addCase(fetchContacts.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(deleteContact.pending, handlePending)


      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)


      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = [...payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((contact) => contact.id !== payload.id);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isLoading = false;
        state.error = null;
      })
  },
});


export const contactsReducer = contactsSlice.reducer;
export const { addNewContact, removeContact } = contactsSlice.actions;


// builder.addMatcher(
//   isAllOf(
//     fetchContacts.pending,
//     addContact.pending,
//     deleteContact.pending
//   ), handlePending
// )