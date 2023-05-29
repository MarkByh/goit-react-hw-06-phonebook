import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
    'https://6472251b6a9370d5a41b1538.mockapi.io';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error, somthing vent wrong');
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error! somthing vent wrong');
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ name, number }, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', { name, number });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error! somthing vent wrong');
        }
    }
);