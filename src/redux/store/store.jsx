import { combineReducers, configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../slices/servicesSlice";
import recordsReducer from "../slices/recordSlice";
import doctorsReducer from "../slices/doctorsSlice";
import reviewsReducer from "../slices/reviewsSlice";
import adminReducer from "../slices/adminSlice";
import languageReducer from "../slices/languageSlice";

const reducer = combineReducers({
    servicesReducer,
    doctorsReducer,
    recordsReducer,
    reviewsReducer,
    adminReducer,
    languageReducer,
})
export const store = configureStore({
    reducer
})