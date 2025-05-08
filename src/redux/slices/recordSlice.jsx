import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { recordsApi } from "../../api/api";

export const getRecords = createAsyncThunk(
    "getRecords",
    async function (info = null, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch(recordsApi);
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const createRecord = createAsyncThunk(
    "createRecord",
    async function (record = null, { dispatch, rejectWithValue }) {
        try {
            const res = await fetch(recordsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                return 'Вы успешно записались';
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const deleteRecord = createAsyncThunk(
    'deleteRecord',
    async (mockupId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${recordsApi}/${mockupId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                return mockupId;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const recordsSlice = createSlice({
    name: 'recordsSlice',
    initialState: {
        records: [],
        loading: false,
        delLoading: false,
        delMessage: null,
        delError: null,
        error: null,
        success: null
    },
    extraReducers: builder => {
        builder.addCase(getRecords.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        builder.addCase(getRecords.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getRecords.pending, (state, action) => {
            state.loading = true;
        })
        // post
        builder.addCase(createRecord.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        })
        builder.addCase(createRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createRecord.pending, (state, action) => {
            state.loading = true;
        })
        // delete
        builder.addCase(deleteRecord.pending, (state, action) => {
            state.delLoading = true;
        })
        builder.addCase(deleteRecord.fulfilled, (state, action) => {
            state.delLoading = false;
            state.records = state.records.filter(record => record.id !== action.payload);
            toast.success("Запись успешно удалена");
        })
        builder.addCase(deleteRecord.rejected, (state, action) => {
            state.delLoading = false;
            toast.error("Ошибка при удалении");
        })
    }
})

export default recordsSlice.reducer;
