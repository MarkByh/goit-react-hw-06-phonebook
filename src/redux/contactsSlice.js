import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  },
  reducers: {
     addContact(state, action) {
      state.items.push(action.payload);
    },
//     addContact: {
//       reducer: (state, action) => {
//         state.items.push(action.payload);
//       },

//       prepare: ({ id, name, number }) => {
//         return {
//           payload: {
//             id,
//             name,
//             number,
//           },
//         };
//       },
//     },

    deleteContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const Config = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  Config,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
