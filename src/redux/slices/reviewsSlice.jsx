import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reviewsApi } from "../../api/api";
import { toast } from "react-toastify";

export const getReviews = createAsyncThunk(
    "getReviews",
    async function (info = null, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch(reviewsApi);
            if (response.status === 200) {
                const reviews = await response.json();
                return reviews;
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

export const createReview = createAsyncThunk(
    "createReview",
    async function (review = null, { dispatch, rejectWithValue }) {
        try {
            const res = await fetch(reviewsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(review)
            });
            if (res.status === 201) {
                return 'Вы успешно оставили отзыв';
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const deleteReview = createAsyncThunk(
    'deleteReview',
    async (mockupId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${reviewsApi}/${mockupId}`, {
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

const reviewsSlice = createSlice({
    name: 'reviewsSlice',
    initialState: {
        reviews: [],
        loading: false,
        delLoading: false,
        delMessage: null,
        delError: null,
        error: null,
        success: null
    },
    extraReducers: builder => {
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        })
        builder.addCase(getReviews.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getReviews.pending, (state, action) => {
            state.loading = true;
        })
        // post
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        })
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createReview.pending, (state, action) => {
            state.loading = true;
        })
        // delete
        builder.addCase(deleteReview.pending, (state, action) => {
            state.delLoading = true;
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.delLoading = false;
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
            toast.success("Отзыв успешно удален");
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.delLoading = false;
            toast.error("Ошибка при удалении");
        })
    }
})

export default reviewsSlice.reducer;
