// redux/slices/adminSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const API_URL = 'https://2080536d818635c5.mokky.dev/admin';

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            const user = data.find(
                u => u.login === login && u.password.toString() === password
            );

            if (!user) {
                toast.error('Неверный логин или пароль');
                return rejectWithValue('Неверные данные');
            }

            toast.success('Успешный вход!');
            localStorage.setItem('admin', 'true');
            return true;
        } catch (err) {
            toast.error('Ошибка сервера');
            return rejectWithValue(err.message);
        }
    }
);

export const outAdmin = createAsyncThunk('admin/logout', async () => {
    localStorage.removeItem('admin');
    toast.success('Вы вышли из системы');
    return false;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        valid: localStorage.getItem('admin') === 'true',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginAdmin.fulfilled, state => {
                state.valid = true;
            })
            .addCase(loginAdmin.rejected, state => {
                state.valid = false;
            })
            .addCase(outAdmin.fulfilled, state => {
                state.valid = false;
            });
    },
});

export default adminSlice.reducer;
