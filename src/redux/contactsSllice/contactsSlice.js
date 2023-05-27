
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

    builder.addCase(fetchContacts.pending, (state) => {
      handlePending(state)
    });
    builder.addCase(addContact.pending, (state) => {
      handlePending(state)
    });
    builder.addCase(deleteContact.pending, (state) => {
      handlePending(state)
    });


    builder.addCase(fetchContacts.rejected, (state, action) => {
      handleRejected(state, action)
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      handleRejected(state, action)
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.error = action.payload;
    });


    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.items = [...payload];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.items = state.items.filter((contact) => contact.id !== payload.id);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      state.items.push(payload);
      state.isLoading = false;
      state.error = null;
    });
  },
});


export const contactsReducer = contactsSlice.reducer;
export const { addNewContact, removeContact } = contactsSlice.actions;


